import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router/index"
var firebase = require("firebase/app")
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    eeee:""
  },
  mutations: {
    setUsuario(state,valor){
      state.user = valor    
    }
  },
  actions: {
    iniciarSesion({commit},user){
      firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
      .then(function(res){        
        commit("setUsuario",{
          email:res.user.email,
          uid:res.user.uid
        })
       
        router.push({name:"Crud"})
      })
      .catch(function(error) {
        console.log(error.message);
      });
    },
    iniciarSesionM({commit},user){
      firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
      .then(function(res){
        console.log(res.user);
        commit("setUsuario",{
          email:res.email,
          uid:res.uid
        })        
      })
      .catch(function(error) {
        console.log(error.message);
      });
    },
    cerrarSesion({commit}){
      firebase.auth().signOut().then((res)=> {
        router.push({name:"login"})
      }).catch(function(error) {
        console.log(error);
      });
    }
  },
  modules: {
  }
})
