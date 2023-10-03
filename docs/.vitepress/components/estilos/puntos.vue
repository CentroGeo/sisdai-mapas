<script setup>
import { ref } from 'vue'

const fuente =
  // 'https://gema.conahcyt.mx/geoserver/wms?service=wfs&version=1.3.0&request=GetFeature&typename=gref_corredores_red_nac_caminos_21_nal_l&outputFormat=application/json'
  '/assets/estados-centroides.geojson'
// '/assets/estados-poligonos.geojson'

const estilos = {
  'Por defecto': undefined,
  'circiulos amarillos': {
    'circulo-relleno-color': 'amarillo',
    'circulo-radio': 10,
  },
  Pictogramas: {
    'icono-fuente': '/assets/aves.svg',
    'icono-escala': 2,
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
    class="sin-cargador con-panel-encabezado-vis"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <template #panel-encabezado-vis>
      <select v-model="seleccion">
        <option
          v-for="(estilo, id) in estilos"
          :value="estilo"
        >
          {{ id }}
        </option>
      </select>
    </template>

    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaVectorial
      :posicion="2"
      :fuente="fuente"
      :globoInformativo="f => `Entidad: <b>${f.nom_edo}</b>`"
      :estilo="seleccion"
    />
  </SisdaiMapa>
</template>
