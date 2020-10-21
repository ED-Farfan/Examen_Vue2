<template>
  <div>
    <v-toolbar
      dark    
    >
     

      <v-toolbar-title v-if="nombre==null">Vuetify</v-toolbar-title>
      <v-toolbar-title v-else>Hola  {{nombre}}</v-toolbar-title>


      
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn icon outlined  @click="cerrarSesion" color="red" v-if="nombre!=null">
        <v-icon>mdi-export</v-icon>    
      </v-btn>
      
    </v-toolbar>
  </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
  name: "barra",
  data() {
      return {
          gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
      }
  },
  methods: {
       ...mapActions(["cerrarSesion"])
  },
  props:["nombre"]
};
</script>