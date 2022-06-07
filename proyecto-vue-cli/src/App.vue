<template lang="" >
  <div class="container-fluid mt-3">
 <div class="jumbotron">
      <h1><center>Examen Primer Parcial</center></h1>
      <br>
    <Navbar/> 
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
   Navbar
  },
}
</script>

<style>
 h1 {
    color:steelblue;    
  }
 
</style>
