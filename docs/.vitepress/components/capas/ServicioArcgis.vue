<template>
  <SisdaiMapa
    :vista="{
      extension: '-99.8170,16.8075,-99.8104,16.8137',
    }"
  >
    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaServicioArcgis
      :url="
        'https://rmgir.proyectomesoamerica.org/server/rest/services/' +
        'OTIS/Col_Arboleda_Cardenista/MapServer'
      "
      :posicion="2"
    />
  </SisdaiMapa>
</template>
