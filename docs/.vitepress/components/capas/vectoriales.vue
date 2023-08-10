<script setup>
import { ref } from 'vue'
// import estados from './ejemplo-estados.json'

const nombre = ref('Capa vectorial')
const opacidad = ref(1)
</script>

<template>
  <SisdaiMapa
    class="sin-cargador con-panel-encabezado-vis con-panel-pie-vis"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <template #panel-encabezado-vis>
      <div>
        <!-- <input
          type="text"
          v-model="nombre"
        /> -->

        <label for="range">Opacidad {{ opacidad }}</label>
        <input
          type="range"
          id="range"
          v-model="opacidad"
          max="1"
          min="0"
          step="0.1"
        />
      </div>
    </template>

    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaVectorial
      id="idVectorial"
      :nombre="nombre"
      fuente="/assets/ejemplo-estados.geojson"
      :opacidad="opacidad"
      :posicion="2"
      :renderizarComoImagen="true"
      :visible="true"
    />
    <!-- :fuente="estados" -->
    <!-- fuente="https://cultura.conacyt.mx/pueblosindigenas-registro-api/media/capa_comunidades_indigenas/comunidades_localidad.geojson" -->

    <template #panel-pie-vis>
      <div>
        <SisdaiLeyenda para="idVectorial" />
      </div>
    </template>
  </SisdaiMapa>
</template>
