<script setup>
import { inject, onMounted, reactive } from 'vue'
import { MAPA_INYECTADO } from '../../utiles/identificadores'
import _props from './props'
import LeyendaControl from './control'

const props = defineProps(_props)
const mapa = inject(MAPA_INYECTADO)
// console.log(toRaw(mapa), props.para)

const capa = reactive({})

onMounted(() => {
  const _capa = mapa.getAllLayers().find(l => l.get('id') === props.para)

  capa.titulo = _capa.get('titulo')
})
</script>

<template>
  <LeyendaControl :etiqueta="capa.titulo" />
</template>
