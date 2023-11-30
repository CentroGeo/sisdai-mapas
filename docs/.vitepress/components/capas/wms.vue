<template>
  <SisdaiMapa
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaWms
      url="https://dadsigvisgeo.conahcyt.mx/geoserver/wms"
      :parametros="{
        LAYERS: 'vacunacion:background_limites_210521',
      }"
    />

    <!-- 
<SisdaiCapaWms
  url="https://dadsigvisgeo.conahcyt.mx/geoserver/wms"
  capa="vacunacion:background_limites_210521"
  estilos="[{
    nombre: 'estilo-geoserver'
    titulo: 'Lo que representa (Ejemplo: Número de personas)',
  },{
    nombre: 'estilo-geoserver'
    titulo: 'Lo que representa (Ejemplo: Número de hectáreas)',
  }]"
/>
     -->
  </SisdaiMapa>
</template>
