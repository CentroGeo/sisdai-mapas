<script setup>
const punto = geojson()
</script>

<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa vectorial."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo una capa vectorial</p>
    </template>

    <SisdaiCapaXyz />

    <SisdaiCapaVectorial
      :estilo="{
        'stroke-color': 'gray',
      }"
      formato="topojson"
      fuente="/assets/estados-topojson.json"
    />

    <SisdaiCapaVectorial
      :estilo="{
        'circle-radius': 10,
        'circle-fill-color': '#58ADA8',
        'circle-stroke-color': 'red',
        'circle-stroke-width': 1
      }"
      :fuente="punto"
      globoInformativo="hola"
      id="punto"
      :ver="true"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="(v) => console.log('C: alFinalizarCarga', v)"
    />

    <!-- <SisdaiCapaVectorial
      fuente="https://gema.conahcyt.mx/geoserver/humanidades_ciencias/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=humanidades_ciencias%3Ahcti_jardines_etnobiologicos_210923_xy_p&outputFormat=application%2Fjson"
    /> -->
  </SisdaiMapa>
</template>

<script>
const geojson = () => ({
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [-102,24] },
  }],
})
</script>
