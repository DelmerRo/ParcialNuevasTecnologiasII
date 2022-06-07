<template>
  <div class="src-components-formulario">
   <div class="jumbotron">
      <h1>{{msgBienvenida}}</h1>
 
     <hr />
      <hr />
      <br />
</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
return{
  msgBienvenida:'Bienvenido al parcial'
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h1{
  color: lightseagreen;
}
</style>
