<template >
  <section class="src-components-resultados">
    <div class="jumbotron">
      <h2>Respuestas a examen</h2>
      <hr />
      <div v-if="respuestas.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Numero de pregunta</th>
            <th>Respuesta</th>
          </tr>
          <tr v-for="(respuesta, index) in respuestas" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ respuesta.respuesa }}</td>
          </tr>
        </table>
      </div>
      <h3 v-else class="alert alert-info">No hay respuestas</h3>
    </div>
    <hr />
    <br />
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-resultados',
    props: [],
    mounted () {

    },
    data () {
      return {
respuestas: [
  { respuesa : "a"},
  { respuesa : "b"},
  { respuesa : "c"},
           
],
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-resultados {
}
.jumbotron {
  background-color: steelblue;
  color: white;
}

hr {
  background-color: #bbb;
}
</style>
