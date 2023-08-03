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
   * Recíbe los ID, separados por espacios, de los elementos que describen al mapa como título, descripciones cortas o largas.
   *
   * - Tipo: `String`
   * - Valor por defecto: `''`
   * - Interactivo: ✅
   *
   * > ℹ️ **Información:** Esta propiedad hace uso del atributo `aria-describedby` para establecer una relación entre el mapa y el texto que los describe.
   */
  elementosDescriptivos: {
    type: String,
    default: '',
  },

  /**
   * Define si se agrega la escala grafica en el mapa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `true`
   * - Interactivo: ✅
   */
  escalaGrafica: {
    type: Boolean,
    default: true,
    validator: valor => typeof valor === typeof Boolean(),
  },

  /**
   * Identificador único del mapa. Si no es definido se asignará un valor aleatorio.
   *
   * - Tipo: `String`
   * - Valor por defecto: Aleatorio
   * - Interactivo: ❌
   */
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   * Objeto que define la vista del mapa. Revisa los detalles de la vista en la [sección vista](/comienza/vista.html) de esta documentación.
   *
   * - Tipo: `Object`
   * - Valor por defecto: `{ centro: [0, 0], zoom: 1.5 }`
   * - Interactivo: ✅
   */
  vista: {
    type: Object,
    default: () => valoresPorDefecto.vista,
    validator: validaciones.vista,
  },

  /**
   * Código de identificación SRS que define la proyección de la vista.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'EPSG:4326'`
   * - Interactivo: ❌
   *
   * > ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.
   *
   * > ⚠️ **Importante:** Las coordenadas y capas que integre en el componente deben coincidir con la `proyeccion` definida en el mapa.
   */
  proyeccion: {
    type: String,
    default: valoresPorDefecto.proyeccion,
  },
})

const emits = defineEmits(Object.values(eventos))
const mapa = shallowRef(null)
const { vista, elementosDescriptivos } = toRefs(props)

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
  usarRegistroMapas().registrarMapa(props.id, mapa.value, props.proyeccion)
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
      :aria-describedby="elementosDescriptivos"
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
@import './../estilos/Accesibilidad.scss';
@import './../estilos/Controles.scss';
</style>
