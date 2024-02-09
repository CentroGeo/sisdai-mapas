<script setup>
import { reactive, ref, watch } from 'vue'

const extensiones = {
  'República Mexicana': [-118.3651, 14.5321, -86.7104, 32.7187],
  Jalisco: [-105.6954, 18.9259, -101.5105, 22.7502],
  Yucatán: [-92.3263, 19.5512, -87.5331, 22.586],
}
const extensionSeleccionada = ref(undefined)

const centros = {
  'República Mexicana': { centro: [-102, 24], acercamiento: 4.4 },
  'Baja California': { centro: [-115.0969, 30.5499], acercamiento: 6.3 },
}
const centroSeleccionado = ref('República Mexicana')
watch(centroSeleccionado, () => (extensionSeleccionada.value = undefined))

const mapa = ref(null)

const vistaActual = reactive({
  centro: undefined,
  acercamiento: undefined,
})
</script>

<template>
  <SisdaiMapa
    class="sin-cargador con-panel-encabezado-vis"
    ref="mapa"
    :vista="{
      centro: centros[centroSeleccionado].centro,
      extension: extensiones[extensionSeleccionada],
      acercamiento: centros[centroSeleccionado].acercamiento,
    }"
    @alCambiarCentro="nuevoCentro => (vistaActual.centro = nuevoCentro)"
    @alCambiarAcercamiento="
      nuevoAcercamiento => (vistaActual.acercamiento = nuevoAcercamiento)
    "
    elementosDescriptivos="descripcion-mapa"
  >
    <template #panel-encabezado-vis>
      <p
        id="descripcion-mapa"
        class="vis-titulo-visualizacion"
      >
        Interación de la vista del mapa:
      </p>
      <div>
        <div class="flex flex-contenido-centrado">
          <div class="columna-8-esc">
            <label for="selector-centro-acercamiento">
              Vista con Acercamiento y Centro
            </label>
            <select
              id="selector-centro-acercamiento"
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

          <div class="columna-8-esc">
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

        <div class="flex flex-contenido-centrado">
          <div class="columna-8-esc">
            <button
              @click="ver"
              class="boton-primario boton-chico"
            >
              Ajustar vista con boton externo
            </button>
          </div>
          <div class="columna-8-esc">
            <p>
              <b>Actual:</b> acercamiento:{{ vistaActual.acercamiento }} <br />
              centro: {{ vistaActual.centro?.toString() }}
            </p>
          </div>
        </div>
      </div>
    </template>

    <SisdaiCapaXyz />
  </SisdaiMapa>
</template>

<style lang="scss" scoped>
.flex {
  margin-left: 0;
  margin-right: 0;
}
</style>
