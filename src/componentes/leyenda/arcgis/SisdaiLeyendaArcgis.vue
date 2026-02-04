<script setup>
import { computed, ref, toRefs, watch } from 'vue'
import _props from './props'

const props = defineProps(_props)
const { capa, titulo, fuente } = toRefs(props)
// const titulo = ref(undefined)
const clases = ref([])
const anchoImg = computed(() => Math.max(...clases.value.map(c => c.width)))

function actualizarClasesDesdeArcgis([capa]) {
  // console.log('actualizarClasesDesdeArcgis')

  fetch(`${props.fuente}/legend?f=pjson`)
    .then(response => response.json())
    .then(({ layers }) => {
      const data = layers.find(layer => layer.layerId.toString() === capa)
      // titulo.value = data?.layerName
      clases.value = data.legend

      // data.legend.forEach(element => {
      //   console.log(element)
      // })
    })
}
actualizarClasesDesdeArcgis([capa.value])
watch([capa, fuente], actualizarClasesDesdeArcgis)
</script>

<template>
  <div class="sisdai-mapa-leyenda-arcgis">
    <div class="leyenda-titulo-arcgis">
      <div class="controlador-vis-arcgis">
        <template v-if="sinControl">
          <p class="lectura-arcgis">
            <img
              v-if="clases.length === 1"
              alt=""
              class="figura-variable-arcgis borde-redondeado-0"
              :height="clases[0]?.height"
              :src="`data:image/png;base64,${clases[0]?.imageData}`"
              :width="clases[0]?.width"
            />
            <span
              class="nombre-variable-arcgis"
              v-html="titulo"
            />
          </p>
        </template>

        <template v-else>
          <input
            :id="`leyenda-titulo-arcgis-${props.id}`"
            type="checkbox"
          />
          <label :for="`leyenda-titulo-arcgis-${props.id}`">
            <img
              v-if="clases.length === 1"
              alt=""
              class="figura-variable-arcgis borde-redondeado-0"
              :height="clases[0]?.height"
              :src="`data:image/png;base64,${clases[0]?.imageData}`"
              :width="clases[0]?.width"
            />
            <span
              class="nombre-variable-arcgis"
              v-html="titulo"
            />
          </label>
        </template>
      </div>
    </div>

    <ul
      v-if="clases?.length > 1"
      class="leyenda-clases-arcgis casillas-subseleccion casillas-anidadas"
    >
      <li
        v-for="(clase, idx) in clases"
        :key="`${clase.label}-clase-control-${idx}`"
      >
        <div class="controlador-vis-arcgis">
          <p class="lectura-arcgis">
            <img
              alt=""
              class="figura-variable-arcgis"
              :height="clase.height"
              :src="`data:image/png;base64,${clase.imageData}`"
              :width="clase.width"
              :style="`margin-inline: calc((${anchoImg}px - ${clase.width}px) / 2)`"
            />
            <span
              class="nombre-variable-arcgis"
              v-text="clase.label"
            />
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa-leyenda-arcgis {
  .leyenda-clases-arcgis {
    padding: 0 0 0 calc(1.25rem + 4px);
  }
  .controlador-vis-arcgis {
    .lectura-arcgis {
      padding: 0;
      margin: 0 0 8px 0;
      line-height: 1.25em;
      color: var(--campo-color);
      vertical-align: text-top;
      display: inline-flex;
    }
    .nombre-variable-arcgis {
      margin-left: 6px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
