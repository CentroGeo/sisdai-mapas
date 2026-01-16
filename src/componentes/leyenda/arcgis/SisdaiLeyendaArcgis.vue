<script setup>
import { ref, toRefs } from 'vue'
// import LeyendaControl from './../control'
import _props from './props'

const props = defineProps(_props)
const { capa, fuente } = toRefs(props)
const titulo = ref(undefined)
const img = ref(undefined)
const clases = ref([])

function actualizarClasesDesdeArcgis([capa, fuente]) {
  fetch(`${fuente}/legend?f=pjson`)
    .then(response => response.json())
    .then(({ layers }) => {
      const data = layers.find(layer => layer.layerId.toString() === capa)
      titulo.value = data?.layerName

      img.value = data.legend[0]?.imageData
      clases.value = data.legend

      data.legend.forEach(element => {
        console.log(element)
      })
    })
}
actualizarClasesDesdeArcgis([capa.value, fuente.value])
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <div class="leyenda-titulo">
      <!-- <LeyendaControl :etiqueta="titulo" /> -->
      <div class="controlador-vis">
        <input
          id="idCheck"
          type="checkbox"
        />
        <label for="idCheck">
          <!-- <img
            class="figura-variable"
            :src="`data:image/png;base64,${img}`"
            alt=""
          /> -->
          <span
            class="nombre-variable"
            v-html="titulo"
          />
        </label>
      </div>
    </div>

    <div
      v-if="clases?.length > 1"
      class="leyenda-clases casillas-subseleccion"
    >
      <ul class="casillas-anidadas">
        <li
          v-for="(clase, idx) in clases"
          :key="`${clase.label}-clase-control-${idx}`"
        >
          <!-- {{ clase.label }} -->
          <div class="controlador-vis">
            <input
              :id="`${clase.label}-control-${idx}`"
              type="checkbox"
            />
            <label :for="`${clase.label}-control-${idx}`">
              <img
                class="figura-variable"
                :src="`data:image/png;base64,${clase.imageData}`"
                alt=""
              />
              <span
                class="nombre-variable"
                v-text="clase.label"
              />
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
