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
            :minlength="nombreMinLength"
            :maxlength="nombreMaxLength"
            no-espacios
          />

          <!-- Mensajes de validación -->
          <field-messages name="nombre" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>

            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo requiere como mínimo {{ nombreMinLength }} caracteres.
            </div>

            <div slot="maxlength" class="alert alert-danger mt-1">
              Este campo requiere como maximo {{ nombreMaxLength }} caracteres.
            </div>

            <div slot="no-espacios" class="alert alert-danger mt-1">
              No se permiten espacios intermedios en este campo.
            </div>
          </field-messages>
        </validate>
        <br />

        <!-- --------------------- -->
        <!--      Campo Numero De Documento       -->
        <!-- --------------------- -->
        <validate tag="div">
          <!-- Elemento de entrada -->
          <label for="numDoc">NumDoc</label>
          <input
            type="number"
            id="numDoc"
            name="numDoc"
            class="form-control"
            autocomplete="off"
            v-model.number="formData.numDoc"
            required
            :min="numDocMin"
            :max="numDocMax"
          />

          <!-- Mensajes de validación -->
          <field-messages name="numDoc" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="min" class="alert alert-danger mt-1">
              El numero de documento mínima permitida es de
              {{ numDocMin }} años.
            </div>
            <div slot="max" class="alert alert-danger mt-1">
              El numero de documento máxima permitida es de
              {{ numDocMax }} años.
            </div>
          </field-messages>
        </validate>
        <br />

        <!-- --------------------- -->
        <!--    Campo Deuda    -->
        <!-- --------------------- -->
        <validate tag="div">
          <!-- Elemento de entrada -->
          <label for="deuda">Deuda</label>
          <input
            type="number"
            id="deuda"
            name="deuda"
            class="form-control"
            autocomplete="off"
            v-model.number="formData.deuda"
            required
            :min="minimoValor"
          />

          <!-- Mensajes de validación -->
          <field-messages name="deuda" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="min" class="alert alert-danger mt-1">
              La Deuda Ingresada tiene que se mayor a {{ minimoValor }}.
            </div>
          </field-messages>
        </validate>
        <br />

        <!-- --------------------- -->
        <!--    Campo Total a Pagar     -->
        <!-- --------------------- -->
        <validate tag="div">
          <!-- Elemento de entrada -->
          <label for="pago">Pago</label>
          <input
            type="number"
            id="pago"
            name="pago"
            class="form-control"
            autocomplete="off"
            v-model.number="formData.pago"
            required
            :min="minimoValor"
          />

          <!-- Mensajes de validación -->
          <field-messages name="pago" show="$dirty">
            <!-- <div class="alert alert-success mt-1">Success!</div> -->
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="min" class="alert alert-danger mt-1">
              El pago Ingresada tiene que se mayor a {{ minimoValor }}.
            </div>
          </field-messages>
        </validate>
        <br />

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
      <br />
      <h1>DETALLE DE GASTOS</h1>
      <br />
      <div v-if="gastos.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Deuda</th>
            <th>Pago</th>
            <th>Fecha</th>
            <th>Saldo</th>
          </tr>
          <tr
            v-for="(gasto, index) in gastos"
            :key="index"
            :style="{ color: analizarSaldo(gasto).color }"
          >
            <td>{{ gasto.nombre }}</td>
            <td>{{ gasto.numDoc }}</td>
            <td>{{ gasto.deuda }}</td>
            <td>{{ gasto.pago }}</td>
            <td>{{ gasto.fecha }}</td>
            <td>{{ analizarSaldo(gasto).valor }}</td>
          </tr>
        </table>
      </div>
      <h3 v-else class="alert alert-info">No hay gastos ingresados.</h3>
    </div>
    <span class="alert alert-info"
      >Cantidad de registros: {{ actualizarCantidadPorEstado.total }}</span
    >
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
      nombreMinLength: 5,
      nombreMaxLength: 15,
      numDocMin: 100000,
      numDocMax: 100000000,
      minimoValor: 0,
      gastos: [],
    };
  },
  methods: {
    getInitialData() {
      return {
        nombre: null,
        Dni: null,
        deuda: null,
        pago: null,
      };
    },

    enviar() {
      let gasto = { ...this.formData };
      gasto.fecha = new Date().toLocaleString();

      console.log(gasto);
      this.gastos.push(gasto);

      this.formData = this.getInitialData();
      this.formstate._reset();
    },
    analizarSaldo(gasto) {
      let dif = gasto.deuda - gasto.pago;
      let color = "#080";
      if (dif > 0) color = "#00F";
      if (dif < 0) color = "#F00";
      return {
        valor: dif,
        color,
      };
    },
  },
  computed: {
    actualizarCantidadPorEstado() {    
      let totalRegistros = this.gastos.length;
      return {
        total: totalRegistros,
       
      };
    },
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