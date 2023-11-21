<template>
  <SisdaiMapa
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
      // extension: '-99.8170,16.8075,-99.8104,16.8137',
    }"
  >
    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaWms
      url="https://dadsigvisgeo.conahcyt.mx/geoserver/wms"
      :parametros="{ LAYERS: 'vacunacion:background_limites_210521' }"
      :posicion="2"
    />

    <SisdaiCapaServicioArcgis
      :url="
        'https://rmgir.proyectomesoamerica.org/server/rest/services/' +
        'OTIS/Col_Arboleda_Cardenista/MapServer'
      "
      :posicion="3"
    />
  </SisdaiMapa>
</template>
