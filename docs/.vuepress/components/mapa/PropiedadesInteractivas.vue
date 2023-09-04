<script setup>
import { ref, watch } from 'vue'

const extensiones = {
  'República Mexicana': [-118.3651, 14.5321, -86.7104, 32.7187],
  Jalisco: [-105.6954, 18.9259, -101.5105, 22.7502],
  Yucatán: [-92.3263, 19.5512, -87.5331, 22.586],
}

const centros = {
  'República Mexicana': [-102, 24],
  'Baja California': [-115.0969, 30.5499],
}

const mapa = ref({
  centro: 'República Mexicana',
  escalaGrafica: true,
  extension: undefined,
  zoom: 4.5,
})

const vistaExtension = ref(false)
watch(vistaExtension, () => {
  quitarExtension()
})

function quitarExtension() {
  if (!vistaExtension.value) {
    mapa.value.extension = undefined
  }
}

function cambiarZoom({ target }) {
  mapa.value.zoom = target.valueAsNumber
}
</script>

<template>
  <div>
    Interacción de Escala Gráfica:
    <span>
      <input
        type="checkbox"
        id="check-escala"
        v-model="mapa.escalaGrafica"
      />
      <label for="check-escala">Visualizar escala</label>
    </span>
    <br />

    Interacón de la vista del mapa: <br />
    <div class="horizontal">
      <div class="vertical">
        <span>
          <input
            id="vistaExtension"
            type="radio"
            name="radioVista"
            :value="true"
            v-model="vistaExtension"
          />
          <label for="vistaExtension">Vista con Extensión</label>
        </span>

        <select
          v-model="mapa.extension"
          :disabled="!vistaExtension"
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
            :value="false"
            v-model="vistaExtension"
          />
          <label for="vistaCentro">Vista con Centro y Zoom</label>
        </span>

        <select
          v-model="mapa.centro"
          :disabled="vistaExtension"
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
        id="inputZoom"
        type="range"
        name=""
        min="1"
        max="22"
        step=".1"
        :value="mapa.zoom"
        @input="cambiarZoom"
      />
      {{ mapa.zoom }}
    </span>

    <SisdaiMapa
      :centro="centros[mapa.centro]"
      :escalaGrafica="mapa.escalaGrafica"
      :vista="{
        centro: centros[mapa.centro],
        zoom: mapa.zoom,
        extension: extensiones[mapa.extension],
      }"
    >
      <SisdaiCapaOsm />
    </SisdaiMapa>
  </div>
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
