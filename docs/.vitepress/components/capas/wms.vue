<template>
  <SisdaiMapa
    class="sin-cargador"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaWms
      url="https://dadsigvisgeo.conahcyt.mx/geoserver/wms"
      :parametros="{ LAYERS: 'vacunacion:background_limites_210521' }"
      :posicion="2"
    />
  </SisdaiMapa>
</template>
