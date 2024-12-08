<script setup>
import { ref, toRefs } from 'vue'
// import { estiloParaSvg } from '../../../utiles/eslitosCapa'
import SisdaiLeyendaControl from './../control'
import _props from './props'

const props = defineProps(_props)
const { informacion, titulo } = toRefs(props)

const simbolo = ref(new Simbolo())

// console.log(estiloParaSvg(props.estilo))
// console.log(props.estilo)
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <div class="leyenda-titulo">
      <SisdaiLeyendaControl
        :informacion="informacion"
        :etiqueta="titulo"
        :simbolo="simbolo"
      />
    </div>
  </div>
</template>

<script>
// function acomodarClases(params) {
//   return new Clase()
// }

class Simbolo {
  tamanio = 18
  atributos = { height: 17, rx: 1, ry: 1, width: 17, x: 0.5, y: 0.5 }
  tipoGrafico = 'rect'

  constructor() {}
}

// class Clase {
//   visible = false
//   titulo = 'clase'
//   simbolo = undefined
// }
</script>
