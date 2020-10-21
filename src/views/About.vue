<template>
  <div >
    <barra :nombre="null"></barra>
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import barra from "@/components/Barra.vue"
export default {
  name:"about",
  components:{
    barra
  }
}
</script>