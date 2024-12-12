<script setup>
import { inject, onMounted, ref } from 'vue'
import { MAPA_INYECTADO } from '../../utiles/identificadores'
import _props from './props'
import LeyendaControl from './control'

const props = defineProps(_props)
const mapa = inject(MAPA_INYECTADO)
const capa = ref()

onMounted(() => {
  capa.value = mapa.getAllLayers().find(l => l.get('id') === props.para)
  // console.log(capa.value.get('tipo'))
})
</script>

<template>
  <LeyendaControl
    :encendido="capa?.getVisible()"
    :etiqueta="capa?.get('titulo')"
    @alCambiar="v => capa?.setVisible(v)"
  />
</template>
