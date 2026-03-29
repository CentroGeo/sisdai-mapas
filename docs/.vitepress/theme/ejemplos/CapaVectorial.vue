<script setup>
import { reactive } from 'vue'

function crearPunto(atributos, coordenadas) {
  return {
    type: 'Feature',
    properties: atributos,
    geometry: { type: 'Point', coordinates: coordenadas },
  }
}

const capa = reactive({
  type: 'FeatureCollection',
  features: [crearPunto({ atributo1: 'valor 1' }, [-102, 24])],
})

function clickVista({ coordenadas }) {
  capa.features.push(
    crearPunto({ atributo1: `valor ${capa.features.length + 1}` }, coordenadas)
  )
}
</script>

<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa vectorial."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
    @clickVista="clickVista"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo una capa vectorial</p>
    </template>

    <SisdaiCapaXyz :posicion="0" />

    <SisdaiCapaVectorial
      :fuente="capa"
      :posicion="2"
      :estilo="{
        // 'circulo-radio': 10,
        // 'circulo-relleno-color': '#58ADA8',
        // 'circulo-contorno-color': 'red',
        // 'circulo-contorno-width': 1,
        'icono-anchura': 32,
        'icono-altura': 32,
        'icono-fuente': '/assets/localizacion.svg',
      }"
      globoInformativo="<p><b>Capa dibujada</b></p>"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="v => console.log('C: alFinalizarCarga', v)"
    />

    <SisdaiCapaVectorial
      :posicion="1"
      :estilo="{ contorno: 'gray', relleno: 'transparente' }"
      formato="topojson"
      fuente="/assets/estados-topojson.json"
      :globoInformativo="
        d => `<p><b>TopoJSON</b><br />Entidad: ${d['nom_ent']}</p>`
      "
    />
  </SisdaiMapa>
</template>
