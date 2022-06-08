<template>
  <section class="src-components-formulario">
    <div class="jumbotron">
      <h2>Componente Formulario</h2>
      <hr />
      <hr />
      <br />

      <vue-form :state="formstate" @submit.prevent="enviar()">
        <!-- --------------------- -->
        <!--     Campo nombre      -->
        <!-- --------------------- -->
        <validate tag="div">
          <!-- Elemento de entrada -->
          <label for="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.nombre"
            required
            :minlength="nombreApellidoMinLength"
            :maxlength="nombreApellidoMaxLength"
            no-espacios
          />

          <!-- Mensajes de validación -->
          <field-messages name="nombre" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>

            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo requiere como mínimo {{ nombreApellidoMinLength }} caracteres.
            </div>

            <div slot="maxlength" class="alert alert-danger mt-1">
              Este campo requiere como maximo {{ nombreApellidoMaxLength }} caracteres.
            </div>

            <div slot="no-espacios" class="alert alert-danger mt-1">
              No se permiten espacios intermedios en este campo.
            </div>
          </field-messages>
        </validate>
        <br />

<!-- --------------------- -->
        <!--     Campo apellido      -->
        <!-- --------------------- -->
        <validate tag="div">
          <!-- Elemento de entrada -->
          <label for="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.apellido"
            required
            :minlength="nombreApellidoMinLength"
            :maxlength="nombreApellidoMaxLength"
            no-espacios
          />

          <!-- Mensajes de validación -->
          <field-messages name="apellido" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>

            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo requiere como mínimo {{ nombreApellidoMinLength }} caracteres.
            </div>

            <div slot="maxlength" class="alert alert-danger mt-1">
              Este campo requiere como maximo {{ nombreApellidoMaxLength }} caracteres.
            </div>

            <div slot="no-espacios" class="alert alert-danger mt-1">
              No se permiten espacios intermedios en este campo.
            </div>
          </field-messages>
        </validate>
        <br />


        <!-- --------------------- -->
        <!--      Campo Nota       -->
        <!-- --------------------- -->
        <validate tag="div">
          <!-- Elemento de entrada -->
          <label for="nota">Nota</label>
          <input
            type="number"
            id="nota"
            name="nota"
            class="form-control"
            autocomplete="off"
            v-model.number="formData.nota"
            required
            :min="notaMin"
            :max="notaMax"
          />

          <!-- Mensajes de validación -->
          <field-messages name="nota" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="min" class="alert alert-danger mt-1">
             La nota ingresada debe ser mayor a
              {{ notaMin }}.
            </div>
            <div slot="max" class="alert alert-danger mt-1">
              La nota ingresada debe ser menor o igual a 
              {{ notaMax }}.
            </div>
          </field-messages>
        </validate>


        <!-- Botón de envío -->
        <button
          class="btn btn-success my-4"
          :disabled="formstate.$invalid"
          type="submit"
        >
          Enviar
        </button>
      </vue-form>
      <hr />
      <h1>Histotial de Notas</h1>
      <div v-if="alumnos.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Alumno</th>
            <th>Nota</th>
           
          </tr>
          <tr v-for="(alumno, index) in alumnos" :key="index">
            <td>{{ alumno.nombre +" "+ alumno.apellido }}</td>
            <td :style="{ color: analizarNota(alumno).color }">{{ alumno.nota }}</td>
           <!--  <td>{{ analizarNota(alumno).valor }}</td> -->
          </tr>
          <th >PROMEDIO TOTAL</th>
          <th :style="{ color: analizarPromedio(actualizaPromedio.promedio).color }">{{actualizaPromedio.promedio}}</th>
        </table>
      </div>
      <h3 v-else class="alert alert-dark">No hay notas ingresadas</h3>
    </div>
  
    
  </section>
</template>

<script >
export default {
  name: "src-components-formulario",
  props: [],
  mounted() {},
  data() {
    return {
      formstate: {},
      formData: this.getInitialData(),
      nombreApellidoMinLength: 3,
      nombreApellidoMaxLength: 15,
      notaMin: 0,
      notaMax: 10,
      alumnos: [],
    };
  },
  methods: {
    getInitialData() {
      return {
        nombre: null,
        apellido: null,
        nota: null,
      };
    },

    enviar() {
      let alumno = {...this.formData}
      this.alumnos.push(alumno);

      this.formData = this.getInitialData();
      this.formstate._reset();
    },


    analizarNota(alumno) {
      let nota = alumno.nota 
      let color = "#080";
      if (nota > 0 && nota<=3) color="#F00";
      if (nota > 3 && nota<=6) color = "#FFCE30";
      if (nota > 7 && nota<=10) color = "#008000";
      
      return {
        color,
      };
    },

 analizarPromedio(promedio) {
       
      let color = "#080";
      if (promedio > 0 && promedio<=3) color="#F00";
      if (promedio > 3 && promedio<=6) color = "#FFCE30";
      if (promedio > 7 && promedio<=10) color = "#008000";
      
      return {
        color,
      };
    },

  },
  computed: {
    actualizaPromedio(){
  let sum=0
  for (let i = 0; i < this.alumnos.length; i++) {
    sum += this.alumnos[i].nota;
}
     let cantidadNotas= this.alumnos.length
     return{
       
      promedio:cantidadNotas!=0?sum/cantidadNotas:0
      }
    }
  },
};
</script>

<style scoped lang="css">
.src-components-formulario {
}

.jumbotron {
  background-color: steelblue;

  color: white;
}

hr {
  background-color: #bbb;
}

pre {
  color: aliceblue;
}
</style>