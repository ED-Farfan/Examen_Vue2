<template>
  <div>
     <barra :nombre="null"></barra>
    <v-container class="">
      <v-row align="center" justify="center">
        <v-col align="center" justify="center">
          <v-card width="400">
            <v-card-title primary-title class="justify-center  light-blue darken-2 "><div class="text-xs-center">
            <h3 class="white--text">Login</h3>
          </div> </v-card-title>
            <v-card-text>
              <v-form>
                <v-container class="">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="email"
                        label="E-mail"
                        :rules="[rules.email]"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col xs5>
                      <v-text-field
                        v-model="pass"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Contraseña"
                        hint="8 caracetes minimo"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="blue" v-if="completo" @click="Iniciar()"
                >Ingresar</v-btn
              >
              <v-btn text color="blue" v-else @click="dialog = true"
                >Crear</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title class="justify-center light-blue darken-4">
          <div class="text-xs-center">
            <h1 class="white--text">Registro</h1>
          </div>
        </v-card-title>
        <v-card-text class="blue lighten-5">
          <v-form>
            <v-container class="">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="nombre"
                    label="Nombre"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    :rules="[rules.email]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col xs5>
                  <v-text-field
                    v-model="pass"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    label="Contraseña"
                    hint="Tiene que contener al menos 8 caracteres"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center blue darken-3">
          <v-container class="justify-center">
            <v-row align="center" justify="center">
              <v-col sm="6" align="center" justify="center" v-if="completoF">
                <div class="justify">
                  <v-btn
                    rounded
                    color="light-green accent-3 "
                    @click="
                      registrar();
                      registrarNombre();
                    "
                    >Ingresar</v-btn
                  >
                </div>
              </v-col>
              <v-col sm="6" align="center" justify="center">
                <div class="justify">
                  <v-btn rounded color="red" @click="Cancelar()"
                    >Cancelar</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { db } from "../main";
import barra from "@/components/Barra.vue"
var firebase = require("firebase/app");
export default {
  name: "login",
  data() {
    return {
      email: "",
      pass: "",
      show1: false,
      nombre: "",
      dialog: false,
      cemail: false,
      uid: "",
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Estructura No Valida";
        },
      },
    };
  },
  methods: {
    ...mapActions(["iniciarSesion", "iniciarSesionM", "cerrarSesion"]),
    Cancelar() {
      this.email = "";
      this.pass = "";
      this.dialog = false;
    },
    Iniciar() {
      this.iniciarSesion({ email: this.email, pass: this.pass });
    },
    async registrarNombre() {
      try {
        await db.collection("nombres").add({
          nombre: this.nombre,
          correo: this.email,
        });
        this.nombre = "";
        this.pass = "";
      } catch (error) {
        console.log(error);
        console.log("Termino Mal");
      }
    },
    async registrar() {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.pass)
          .then(function (response) {
            console.log("Agregamos nuevo usuario");
          })
          .catch(function (error) {
            console.log("Error1");
            console.log(error);
          });
        this.dialog = false;
      } catch (error) {
        console.log("Error1");
        console.log(error);
      }
    },
  },
  computed: {
    completo() {
      if (!this.completo2  || this.pass == "") {
        return false;
      } else {
        return true;
      }
    },
    completo2() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(this.email);
    },
    completoF() {
      return this.completo2 && this.nombre != "" && this.pass.length >= 8;
    },

    ...mapState(["user"]),
  },
   components:{
    barra
  }
};
</script>