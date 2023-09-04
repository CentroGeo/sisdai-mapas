<script setup>
import { onMounted, ref, watch, SetupContext } from 'vue'

const tipoVista = ref('centro')
watch(tipoVista, nuevoValor => {
  if (nuevoValor === 'centro') extensionSeleccionada.value = undefined
  else extensionSeleccionada.value = 'República Mexicana'
})

const extensiones = {
  'República Mexicana': [-118.3651, 14.5321, -86.7104, 32.7187],
  Jalisco: [-105.6954, 18.9259, -101.5105, 22.7502],
  Yucatán: [-92.3263, 19.5512, -87.5331, 22.586],
}
const extensionSeleccionada = ref(undefined)

const centros = {
  'República Mexicana': [-102, 24],
  'Baja California': [-115.0969, 30.5499],
}
const centroSeleccionado = ref('República Mexicana')

const zoomMapa = ref(4.5)
function alCambiarZoom(nuevoZoom) {
  zoomMapa.value = nuevoZoom
}

const mapa = ref(null)
function ajustar() {
  mapa.value.ajustarVista()
}
</script>

<template>
  <SisdaiMapa
    ref="mapa"
    :vista="{
      centro: centros[centroSeleccionado],
      extension: extensiones[extensionSeleccionada],
      zoom: zoomMapa,
    }"
    @alCambiarZoom="alCambiarZoom"
  >
    <SisdaiMapaEncabezado>
      Interacón de la vista del mapa: <br />
      <div class="horizontal">
        <div class="vertical">
          <span>
            <input
              id="vistaExtension"
              type="radio"
              name="radioVista"
              value="extension"
              v-model="tipoVista"
            />
            <label for="vistaExtension">Vista con Extensión</label>
          </span>

          <select
            v-model="extensionSeleccionada"
            :disabled="tipoVista !== 'extension'"
          >
            <option
              v-for="(_, idx) in extensiones"
              :key="`ext_${idx}`"
              :value="idx"
            >
              {{ idx }}
            </option>
          </select>
        </div>

        <div class="vertical">
          <span>
            <input
              id="vistaCentro"
              type="radio"
              name="radioVista"
              value="centro"
              v-model="tipoVista"
            />
            <label for="vistaCentro">Vista con Centro y Zoom</label>
          </span>

          <select
            v-model="centroSeleccionado"
            :disabled="tipoVista !== 'centro'"
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
      </div>

      <span class="horizontal">
        Zoom
        <input
          type="range"
          min="1"
          max="22"
          step=".1"
          v-model="zoomMapa"
        />
        {{ zoomMapa }}
      </span>

      <button
        @click="ajustar"
        class="boton-primario boton-chico"
      >
        Ajustar con boton externo
      </button>
    </SisdaiMapaEncabezado>

    <SisdaiCapaOsm />
  </SisdaiMapa>
</template>

<style lang="scss" scoped>
.horizontal {
  display: flex;
  justify-content: space-around;
}
.vertical {
  display: flex;
  flex-direction: column;
}
button:not(:last-child) {
  margin-right: 0;
}
</style>
