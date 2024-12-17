<script setup>
import { inject, onMounted, ref } from 'vue'
import { MAPA_INYECTADO } from '../../utiles/identificadores'
import _props from './props'
import LeyendaControl from './control'
import LeyendaWms from './wms'

const props = defineProps(_props)
const mapa = inject(MAPA_INYECTADO)
const capa = ref()

onMounted(() => {
  capa.value = mapa.getAllLayers().find(l => l.get('id') === props.para)
  // console.log(toRaw(capa.value))

  // if (capa.value?.get('tipo') === 'wms') {
  //   console.log(toRaw(capa.value))
  // }
})
</script>

<template>
  <LeyendaWms
    v-if="capa?.get('tipo') === 'wms'"
    :nombre="capa?.getSource().getParams().LAYERS"
    :sinControlClases="true"
    :titulo="capa?.get('titulo')"
    @alCambiarVisibilidad="([v]) => capa?.setVisible(v)"
  />

  <LeyendaControl
    v-else
    :encendido="capa?.getVisible()"
    :etiqueta="capa?.get('titulo')"
    @alCambiar="v => capa?.setVisible(v)"
  />
</template>
