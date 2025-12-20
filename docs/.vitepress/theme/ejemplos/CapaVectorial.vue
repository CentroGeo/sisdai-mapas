<script setup>
import { ref } from 'vue'

const punto = geojson()

const geojsonMarcas = () => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 0, img: 'url' },
      geometry: {
        type: 'Point',
        coordinates: [-100.87976758760212, 20.754629042101435],
      },
    },
  ],
})

const puntos = ref({})
const contador = ref(0)

puntos.value = geojsonMarcas()

function clickMarca({ coordenadas }) {
  contador.value += 1
  puntos.value.features.push({
    type: 'Feature',
    properties: { id: contador.value, img: 'url' },
    geometry: { type: 'Point', coordinates: coordenadas },
  })
  // console.log('puntos.features', puntos.value.features)
}
</script>

<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa vectorial."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
    @clickMarca="clickMarca"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo una capa vectorial</p>
    </template>

    <SisdaiCapaVectorial
      :estilo="{ contorno: 'gray', relleno: 'transparente' }"
      formato="topojson"
      fuente="/assets/estados-topojson.json"
      :globoInformativo="
        d => `<p><b>TopoJSON</b><br />Entidad: ${d['nom_ent']}</p>`
      "
    />

    <SisdaiCapaVectorial
      :estilo="{
        'circulo-radio': 10,
        'circulo-relleno-color': '#58ADA8',
        'circulo-contorno-color': 'red',
        'circulo-contorno-width': 1,
      }"
      :fuente="punto"
      globoInformativo="<p><b>GeoJSON</b></p>"
      id="punto"
      :ver="true"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="v => console.log('C: alFinalizarCarga', v)"
    />

    <!-- <SisdaiCapaVectorial
      v-for="value in puntos.features"
      :key="value.properties.id"
      :id="`puntos_${value.properties.id}`"
      :estilo="{ 'circulo-radio': 5, 'circulo-relleno-color': 'red' }"
      :fuente="puntos"
    /> -->
    <!-- <SisdaiCapaVectorial
      v-for="value in puntos.features"
      :key="value.properties.id"
      :id="`puntos_${value.properties.id}`"
      :estilo="iconStyle"
      :fuente="puntos"
    /> -->

    <SisdaiCapaVectorial
      v-for="value in puntos.features"
      :key="value.properties.id"
      :id="`puntoss_${value.properties.id}`"
      :fuente="puntos"
      :estilo="{
        'icono-anchura': 32,
        'icono-altura': 32,
        'icono-fuente': '/assets/localizacion.svg',
      }"
    />
  </SisdaiMapa>
</template>

<script>
const geojson = () => ({
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-102, 24] } },
  ],
})
</script>
