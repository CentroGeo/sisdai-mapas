<script setup>
import { onMounted, onUnmounted, shallowRef, toRefs, watch } from 'vue'
import usarRegistroMapas from './../composables/usarRegistroMapas'
import eventos from './../eventos/mapa'
import { idAleatorio, stringifyIguales } from './../utiles'
import * as validaciones from './../utiles/validaciones'
import * as valoresPorDefecto from './../valores/mapa'
import BotonConahcyt from './BotonConahcyt.vue'
import SisdaiCargando from './SisdaiCargando.vue'

const props = defineProps({
  /**
   *
   */
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   * dar prioridad a la extención en caso de ser valida
   */
  vista: {
    type: Object,
    default: () => valoresPorDefecto.vista,
    validator: validaciones.vista,
  },
})

const emits = defineEmits(Object.values(eventos))
const mapa = shallowRef(null)
const { vista } = toRefs(props)

function asignarValoresVista() {
  usarRegistroMapas()
    .mapa(props.id)
    .asignarVista({ ...valoresPorDefecto.vista, ...vista.value })
}
function actualizarValoresVista(nv, vv) {
  if (validaciones.extension(nv.extension)) {
    if (stringifyIguales(nv.extension, vv.extension)) {
      usarRegistroMapas().mapa(props.id).asignarExtension(nv.extension)
    }

    // if (stringifyIguales(nv.extensionMargen, vv.extensionMargen)) {
    //   lista.push('extensionMargen')
    // }

    return
  }

  if (stringifyIguales(nv.centro, vv.centro)) {
    usarRegistroMapas().mapa(props.id).asignarCentro(nv.centro)
  }

  if (Number(nv.zoom) !== vv.Zoom) {
    usarRegistroMapas().mapa(props.id).asignarZoom(nv.zoom)
  }
}
watch(vista, actualizarValoresVista)

function olMoveend(e) {
  emits(eventos.alMoverVista, e)

  const nuevoCentro = e.map.getView().getCenter()
  if (stringifyIguales(nuevoCentro, vista.value.centro)) {
    emits(eventos.alCambiarCentro, nuevoCentro)
  }

  const nuevoZoom = Math.round(e.map.getView().getZoom() * 100) / 100
  if (Number(vista.value.zoom) !== nuevoZoom) {
    emits(eventos.alCambiarZoom, nuevoZoom)
  }
}

onMounted(() => {
  console.log('SisdaiMapa')
  usarRegistroMapas().registrarMapa(props.id, mapa.value)
  asignarValoresVista()
  usarRegistroMapas().mapa(props.id).on('moveend', olMoveend)
})

onUnmounted(() => {
  usarRegistroMapas().mapa(props.id).un('moveend', olMoveend)
  usarRegistroMapas().borrarMapa(props.id)
})

defineExpose({
  /**
   *
   * @param {*} nombreImagen
   */
  exportarImagen: nombreImagen => {
    console.log('exportarImagen', nombreImagen)
    usarRegistroMapas().mapa(props.id).exportarImagen(nombreImagen)
  },

  /**
   *
   */
  ajustarVista: () => {
    asignarValoresVista()
  },
})
</script>

<template>
  <div
    :sisdai-mapa="id"
    class="sisdai-mapa contenedor-vis borde borde-color-2 borde-redondeado-8"
  >
    <div class="panel-encabezado-vis">
      <slot name="panel-encabezado-vis" />
    </div>

    <div class="panel-izquierda-vis">
      <slot name="panel-izquierda-vis" />
    </div>

    <!-- slot para las capas -->
    <slot />

    <figure
      class="contenido-vis"
      ref="mapa"
    />

    <div class="panel-derecha-vis">
      <slot name="panel-derecha-vis" />
    </div>

    <div class="panel-pie-vis">
      <slot name="panel-pie-vis" />
    </div>

    <SisdaiCargando />
    <BotonConahcyt />
  </div>
</template>

<style lang="scss">
@import './../estilos/SisdaiMapa.scss';
</style>
