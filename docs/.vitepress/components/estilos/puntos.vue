<script setup>
import { ref } from 'vue'

const fuente =
  // 'https://gema.conahcyt.mx/geoserver/wms?service=wfs&version=1.3.0&request=GetFeature&typename=gref_corredores_red_nac_caminos_21_nal_l&outputFormat=application/json'
  '/assets/estados-centroides.geojson'
// '/assets/estados-poligonos.geojson'

const estilos = {
  'Por defecto': undefined,
  'Circiulos amarillos': {
    'circulo-relleno-color': 'amarillo',
    'circulo-radio': 10,
  },
  Pictogramas: {
    'icono-fuente': '/assets/aves.svg',
    'icono-escala': 0.8,
  },
  Cuadrados: {
    'forma-puntos': 4,
    'forma-radio': 12,
    'forma-contorno-color': 'verde-oscuro',
    'forma-contorno-grosor': 2,
    'forma-angulo': Math.PI / 4,
  },
}

const seleccion = ref(undefined)
</script>

<template>
  <SisdaiMapa
    class="sin-cargador con-panel-izquierda-vis"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <template #panel-izquierda-vis>
      <div class="m-r-2">
        <h5 class="m-y-0">Puntos</h5>
        <select
          class="m-y-1"
          v-model="seleccion"
        >
          <option
            v-for="(estilo, id) in estilos"
            :value="estilo"
          >
            {{ id }}
          </option>
        </select>

        <SisdaiLeyenda para="puntos" />

        <h5 class="m-y-0">Líneas</h5>
        <!-- <SisdaiLeyenda para="puntos" /> -->

        <h5 class="m-y-0">Polígonos</h5>
        <!-- <SisdaiLeyenda para="puntos" /> -->
      </div>
    </template>

    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaVectorial
      id="puntos"
      :posicion="2"
      :fuente="fuente"
      :estilo="seleccion"
    />
  </SisdaiMapa>
</template>
