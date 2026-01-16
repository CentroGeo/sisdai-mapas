<script setup>
import { inject, onMounted, ref, toRaw } from 'vue'
import { MAPA_INYECTADO } from '../../utiles/identificadores'
import LeyendaControl from './control'
import _props from './props'
import LeyendaWms from './wms'

const props = defineProps(_props)
const mapa = inject(MAPA_INYECTADO)
const capaVinculada = ref()

onMounted(() => {
  mapa
    .busquedaPromesa(mapa =>
      mapa.getAllLayers().find(capa => capa.get('id') === props.para)
    )
    .then(capa => {
      capaVinculada.value = capa
      if (capaVinculada.value.get('tipo') === 'wms') {
        console.log(toRaw(capaVinculada.value))
      }
    })
})
</script>

<template>
  <LeyendaWms
    v-if="capaVinculada?.get('tipo') === 'wms'"
    :fuente="capaVinculada?.getSource().getUrl()"
    :nombre="capaVinculada?.getSource().getParams().LAYERS"
    :sinControlClases="true"
    :titulo="capaVinculada?.get('titulo')"
    @alCambiarVisibilidad="([v]) => capaVinculada?.setVisible(v)"
  />

  <LeyendaControl
    v-else
    :encendido="capaVinculada?.getVisible()"
    :etiqueta="capaVinculada?.get('titulo')"
    @alCambiar="v => capaVinculada?.setVisible(v)"
  />
</template>
