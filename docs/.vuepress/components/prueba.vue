<template>
  <SisdaiMapa
    :vista="{
      centro: [-102, 24],
      zoom: 4.5,
    }"
  >
    <!--
      :extension="mapa.extension"
    -->
    <SisdaiMapaCapas>
      <SisdaiCapaOsm
        :id="osm.id"
        :nombre="osm.nombre"
        :visible="osm.visible"
        :zIndex="osm.zIndex"
        @alIniciarCarga="tipo => alIniciarCarga('osm', tipo)"
        @alFinalizarCarga="tipo => alFinalizarCarga('osm', tipo)"
      />

      <SisdaiCapaWms
        :extension="agricultura.extension"
        :id="agricultura.id"
        :nombre="agricultura.nombre"
        :parametros="agricultura.parametros"
        :url="agricultura.url"
        :verCargador="true"
        :visible="agricultura.visible"
        :zIndex="agricultura.zIndex"
        @alIniciarCarga="tipo => alIniciarCarga('wms', tipo)"
        @alFinalizarCarga="tipo => alFinalizarCarga('wms', tipo)"
      />

      <SisdaiCapaWms
        :extension="anp.extension"
        :id="anp.id"
        :nombre="anp.nombre"
        :parametros="anp.parametros"
        :url="anp.url"
        :verCargador="true"
        :visible="anp.visible"
        :zIndex="anp.zIndex"
        @alIniciarCarga="tipo => alIniciarCarga('wms', tipo)"
        @alFinalizarCarga="tipo => alFinalizarCarga('wms', tipo)"
      />
    </SisdaiMapaCapas>

    <SisdaiMapaEncabezado>
      <SisdaiMapaLeyenda :para="agricultura.id" />
      <SisdaiMapaLeyenda :para="anp.id" />
    </SisdaiMapaEncabezado>
  </SisdaiMapa>
</template>

<script setup>
import { ref } from 'vue'

const geoserver = 'https://gema.conacyt.mx/geoserver/'

const extension = [
  -118.365119934082, 14.5320978164673, -86.7104034423828, 32.7186546325684,
]

const mapa = ref({
  centro: [-102, 24],
  // extension,
  zoom: 4.5,
})

const osm = ref({
  id: 'osm-capa-id',
  nombre: 'Capa de OpenStreetMap',
  visible: true,
  zIndex: 0,
})

const agricultura = ref({
  extension: [-92.6814, 17.0835, -86.9051, 21.5102],
  id: 'agricultura',
  nombre: 'Agricultura en la región del Tren Maya 2018',
  parametros: { LAYERS: 'tren_maya_agricultura_2018' },
  url: `${geoserver}wms`,
  visible: false,
  zIndex: 2,
})

const anp = ref({
  extension: [-92.4764, 17.5699, -86.7261, 21.5948],
  id: 'anp',
  nombre:
    'Áreas Naturales Protegidas estatales en la región del Tren Maya 2020',
  parametros: { LAYERS: 'tren_maya_anp_estatales_2020' },
  url: `${geoserver}wms`,
  visible: false,
  zIndex: 2,
})

function alIniciarCarga(tipo) {
  console.log(`Empezó a cargar ${tipo}`)
}
function alFinalizarCarga(tipo, estatus) {
  console.log(`Terminó de cargar ${tipo}`, estatus)
}

// function consultarExtension(capa) {
//   return fetch(
//     `${geoserver}ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${capa}&maxFeatures=1&outputFormat=application/json`
//   ).then(r => r.json())
// }
// consultarExtension(anp.value.parametros.LAYERS).then(d => {
//   console.log(d.bbox)
// })
</script>

<style lang="scss">
.inline {
  display: flex;
  input[type='text'] {
    margin: 0 !important;
  }
}
</style>
