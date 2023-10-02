<script setup>
const fuente =
  // 'https://gema.conahcyt.mx/geoserver/wms?service=wfs&version=1.3.0&request=GetFeature&typename=gref_corredores_red_nac_caminos_21_nal_l&outputFormat=application/json'
  '/assets/estados-centroides.geojson'
// '/assets/estados-poligonos.geojson'
</script>

<template>
  <SisdaiMapa
    class="sin-cargador"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaVectorial
      :posicion="2"
      :fuente="fuente"
      :globoInformativo="f => `Entidad: <b>${f.nom_edo}</b>`"
      :estilo="{
        relleno: { color: 'amarillo' },
        contorno: { color: 'rojo', grosor: 3 },
        forma: { contorno: { color: 'rojo', grosor: 3 } },
        radio: 5,
        'shape-fill-color': 'yellow',
      }"
    />
  </SisdaiMapa>
</template>
