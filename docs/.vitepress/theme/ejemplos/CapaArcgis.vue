<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa de servicio de Arcgis."
    :vista="{ extension: '-177.5,23.5,-68.5,70.5' }"
  >
    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaArcgis
      fuente="https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/USA/MapServer"
      :mosaicos="true"
      :posicion="2"
    />
  </SisdaiMapa>
</template>
