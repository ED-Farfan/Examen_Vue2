import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

var firebase = require("firebase/app")
require("firebase/firestore")
require("firebase/auth")
require("firebase/storage")
const firebaseConfig = {
  apiKey: "AIzaSyBUxPneCdsW_xEy0EMQQpXp0LEqrn_H1m0",
  authDomain: "examen2-2a652.firebaseapp.com",
  databaseURL: "https://examen2-2a652.firebaseio.com",
  projectId: "examen2-2a652",
  storageBucket: "examen2-2a652.appspot.com",
  messagingSenderId: "160070747381",
  appId: "1:160070747381:web:e5eb21603224296596f1bc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
const db = firebase.firestore()
export{db,storage}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
