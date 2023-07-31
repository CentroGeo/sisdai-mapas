<script setup>
import { ref, watch } from 'vue'

const extensionSeleccionada = ref(undefined)
const extensiones = {
  'República Mexicana': [-118.3651, 14.5321, -86.7104, 32.7187],
  Jalisco: [-105.6954, 18.9259, -101.5105, 22.7502],
  Yucatán: [-92.3263, 19.5512, -87.5331, 22.586],
}

const centroSeleccionado = ref('República Mexicana')
const centros = {
  'República Mexicana': [-102, 24],
  'Baja California': [-115.0969, 30.5499],
}
watch(centroSeleccionado, () => (extensionSeleccionada.value = undefined))

const zoomMapa = ref(4.5)
function alCambiarZoom(nuevoZoom) {
  zoomMapa.value = nuevoZoom
}

const mapa = ref(null)
function ajustar() {
  // mapa.value.ajustarVista()
}
</script>

<template>
  <SisdaiMapa
    class="sin-cargador con-panel-encabezado-vis"
    ref="mapa"
    :vista="{
      centro: centros[centroSeleccionado],
      extension: extensiones[extensionSeleccionada],
      zoom: zoomMapa,
    }"
    @alCambiarZoom="alCambiarZoom"
  >
    <template #panel-encabezado-vis>
      <div class="p-x-1 p-b-1">
        <p>Interacón de la vista del mapa:</p>
        <div class="horizontal">
          <div>
            <label for="selector-centro-zoom">Vista con Centro y Zoom</label>
            <select
              id="selector-centro-zoom"
              v-model="centroSeleccionado"
            >
              <option
                v-for="(_, idx) in centros"
                :key="`cent_${idx}`"
                :value="idx"
              >
                {{ idx }}
              </option>
            </select>
          </div>

          <div>
            <label for="selector-extencion">Vista con Extensión</label>
            <select
              id="selector-extencion"
              v-model="extensionSeleccionada"
            >
              <option :value="undefined">Indefinida</option>
              <option
                v-for="(_, idx) in extensiones"
                :key="`ext_${idx}`"
                :value="idx"
              >
                {{ idx }}
              </option>
            </select>
          </div>
        </div>

        <div class="horizontal">
          <label for="zoom">Zoom {{ zoomMapa }}: </label>
          <input
            type="range"
            id="zoom"
            min="1"
            max="22"
            step=".1"
            v-model="zoomMapa"
          />
        </div>

        <button
          @click="ajustar"
          class="boton-primario boton-chico"
        >
          Ajustar con boton externo
        </button>
      </div>
    </template>
    <SisdaiCapaXyz />
  </SisdaiMapa>
</template>

<style lang="scss" scoped>
.horizontal {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}
</style>
