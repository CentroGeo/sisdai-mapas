<script setup>
function alAjustarVista() {
  console.log('alAjustarVista desde extensionPorCapasVisibles')
}

const capas = [
  {
    id: 'agricultura',
    extension: [-92.6814, 17.0835, -86.9051, 21.5102],
    nombre: 'Agricultura en la región del Tren Maya 2018',
    layer: 'tren_maya_agricultura_2018',
  },
  {
    extension: [-92.4764, 17.5699, -86.7261, 21.5948],
    id: 'anp',
    nombre:
      'Áreas Naturales Protegidas estatales en la región del Tren Maya 2020',
    layer: 'tren_maya_anp_estatales_2020',
  },
]
</script>

<template>
  <SisdaiMapa
    :vista="{
      centro: [-102, 24],
      zoom: 4.5,
    }"
    :ajustarVistaPorCapasVisibles="true"
    :ajustarVistaPorCapasVisiblesAutomatico="true"
    @alAjustarVista="alAjustarVista"
  >
    <SisdaiMapaCapas>
      <SisdaiCapaOsm :zIndex="0" />

      <!--SisdaiCapaWms
        :extension="[-92.6814, 17.0835, -86.9051, 21.5102]"
        id="agricultura"
        nombre="Agricultura en la región del Tren Maya 2018"
        :parametros="{ LAYERS: 'tren_maya_agricultura_2018' }"
        url="https://gema.conacyt.mx/geoserver/wms"
        :visible="true"
        :zIndex="1"
      />

      <SisdaiCapaWms
        :extension="[-92.4764, 17.5699, -86.7261, 21.5948]"
        id="anp"
        nombre="Áreas Naturales Protegidas estatales en la región del Tren Maya 2020"
        :parametros="{ LAYERS: 'tren_maya_anp_estatales_2020' }"
        url="https://gema.conacyt.mx/geoserver/wms"
        :visible="false"
        :zIndex="2"
      /-->
    </SisdaiMapaCapas>

    <SisdaiMapaEncabezado>
      <!--SisdaiMapaLeyenda para="agricultura" />
      <SisdaiMapaLeyenda para="anp" /-->
    </SisdaiMapaEncabezado>
  </SisdaiMapa>
</template>
