<template>
  <div>
     <barra :nombre="nombreU"></barra>
    <template>      
      <v-data-table :headers="headers" :items="desserts" hide-default-footer>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="modificar(item)"> mdi-pencil </v-icon>
          <v-icon small color="red" @click="Borrar(item)"> mdi-delete </v-icon>
        </template>        
      </v-data-table>
    </template>
     <v-container class="">
        <v-row>
          <v-col align-self="center"  align="center"     justify="center"><v-btn  outlined color="blue" @click="dialog=true">Nuevo Producto</v-btn></v-col>
        </v-row>
      </v-container>
    
    
    
    <v-dialog
      v-model="dialog"      
      color="primary"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card >
        <v-card-title class="headline grey lighten-2">
          Agregar Producto
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="">
              <v-row>
                <v-col>
                  <v-text-field
                    dense
                    label="Nombre"
                    v-model="nombre"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    dense
                    label="Precio"
                    type="number"
                    v-model="precio"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    dense
                    label="Cantidad"
                    type="number"
                    v-model="cantidad"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text elevation="" color="blue" @click="addProductos()" v-if="Termino">Agregar</v-btn>          
          <v-btn text elevation="" color="red" @click="cancelar()">Cancelar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog2"
      
      color="primary"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="headline indigo darken-4" dark>
          <h3 class="white--text">Modificar Producto</h3>
        </v-card-title>

        <v-card-text class="green lighten-5">
          <v-form>
            <v-container class="">
              <v-row>
                <v-col>
                  <v-text-field
                    dense
                    label="Nombre"
                    v-model="nombre"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    dense
                    label="Precio"
                    type="number"
                    v-model="precio"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    dense
                    label="Cantidad"
                    type="number"
                    v-model="cantidad"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text elevation="" color="blue" @click="Actualizar()" v-if="Termino">Agregar</v-btn>          
          <v-btn text elevation="" color="red" @click="cancelar()">Cancelar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import barra from "@/components/Barra.vue"
import { db } from "../main";
import {mapActions,mapState} from 'vuex'
export default {
  name: "crud",
  data() {
    return {
      dialog: false,
      dialog2: false,
      id:null,
      nombreU:"",
      nombre: "",
      cantidad: 0,
      precio: 0,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Cantidad", value: "cantidad" },
        { text: "Precio($)", value: "precio" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
    };
  },
  mounted(){
     this.getProductos()
  },
  created() {
     this.getNombre()
  },
  computed: {
      Termino(){
          if(this.nombre=="" || this.precio <= 0||this.cantidad <= 0){
              return false
          }
          else{
              return true
          }
      },
      ...mapState(["user"])
  },
  methods: {
      ...mapActions(["cerrarSesion"]),
    async getNombre(){
      try{
        const pro = await db.collection("nombres").get();
        const DBproductos = [];        
        pro.forEach((element) => {          
          let nuevo = element.data();          
          if(nuevo.correo==this.user.email){
            this.nombreU=nuevo.nombre
          }          
        });
        this.desserts = DBproductos;
      } catch (error) {
        console.log(error);
      }
    },
    cancelar() {
      (this.nombre = ""),
        (this.cantidad = 0),
        (this.precio = 0),
        (this.dialog = false);
        this.dialog2=false
    },
    Agregar() {
      this.desserts.push({
        name: this.nombre,
        cantidad: this.cantidad,
        precio: this.precio,
      });
    },
    async getProductos() {
      try {
        const pro = await db.collection("productos").get();
        const DBproductos = [];
        pro.forEach((element) => {
          let nuevo = element.data();
          nuevo.id = element.id;
          DBproductos.push(nuevo);
        });
        this.desserts = DBproductos;
      } catch (error) {
        console.log(error);
      }
    },
    async addProductos() {
      try {
        await db.collection("productos").add({
          name: this.nombre,
          cantidad: this.cantidad,
          precio: this.precio,
        });        
        this.cancelar();
        this.getProductos();
      } catch (error) {
        console.log(error);
      }
    },
    async Borrar(pro) {
      try {
        await db.collection("productos").doc(pro.id).delete();
        this.getProductos();
      } catch (error) {
        console.log(error);
      }
    },
    modificar(item){
        this.id = item.id
        this.nombre = item.name
        this.cantidad = item.cantidad
        this.precio  = item.precio
        this.dialog2 = true
    },
    async Actualizar(){
        try {
            await db.collection('productos').doc(this.id).update({
                name: this.nombre,
                cantidad: this.cantidad,
                precio: this.precio
            })
            this.cancelar()
            this.getProductos()
        } catch (error) {
            console.log(error);
        }
    }
  },
  components:{
    barra
  }
};
</script>