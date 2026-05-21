<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa de servicio de Arcgis."
    :vista="{ extension: '-101.4,10.3,0,70.7', extensionMargen: '10,70,10,10' }"
  >
    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaArcgis
      fuente="https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer"
      capa="0"
      :mosaicos="false"
      :posicion="2"
    />

    <SisdaiCapaArcgis
      fuente="https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer"
      capa="1"
      :mosaicos="false"
      :posicion="3"
    />
  </SisdaiMapa>
</template>
