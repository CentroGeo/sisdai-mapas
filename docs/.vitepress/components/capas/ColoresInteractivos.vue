<script setup>
import { ref } from 'vue'

const colores = ['no', 'red', 'white', 'black', 'gray']

const colorContorno = ref('white')
const colorRelleno = ref('gray')
const grosor = ref(1)
</script>

<template>
  <SisdaiMapa
    class="sin-cargador con-panel-encabezado-vis"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <template #panel-encabezado-vis>
      <div>
        Interacón del estilo de una capa vectorial: <br />
        <div class="horizontal">
          Relleno:
          <select v-model="colorRelleno">
            <option
              v-for="(valor, idx) in colores"
              :key="`relleno_${idx}`"
              :value="valor"
            >
              {{ valor }}
            </option>
          </select>

          Contorno:
          <select v-model="colorContorno">
            <option
              v-for="(valor, idx) in colores"
              :key="`contorno_${idx}`"
              :value="valor"
            >
              {{ valor }}
            </option>
          </select>
        </div>

        <span class="horizontal">
          Grosor
          <input
            type="range"
            min="0"
            max="10"
            step=".5"
            v-model="grosor"
          />
          {{ grosor }}
        </span>

        <!-- <sisdai-mapa-leyenda para="capa-color" /> -->
      </div>
    </template>

    <SisdaiCapaVectorial
      id="idVectorial"
      nombre="Capa con color interactivo"
      :posicion="2"
      :renderizarComoImagen="true"
      :visible="true"
      fuente="/assets/ejemplo-estados.geojson"
      :globoInformativo="f => `Entidad: <b>${f.nom_edo}</b>`"
      :estilo="{
        contorno:
          colorContorno !== 'no'
            ? { color: colorContorno, grosor: grosor }
            : colorContorno,
        relleno: colorRelleno !== 'no' ? { color: colorRelleno } : colorRelleno,
      }"
    />

    <SisdaiCapaXyz :posicion="1" />
  </SisdaiMapa>
</template>

<style lang="scss" scoped>
.horizontal {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  align-items: center;

  > input,
  > select {
    margin: 10px 0;
  }
}
.vertical {
  display: flex;
  flex-direction: column;
}
button:not(:last-child) {
  margin-right: 0;
}
</style>
