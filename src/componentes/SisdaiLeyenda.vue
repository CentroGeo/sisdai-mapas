<script setup>
import {
  onMounted,
  onUnmounted,
  reactive,
  shallowRef,
  toRefs,
  watch,
} from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai } from '../utiles'
import { tiposCapa } from '../valores/capa'
import LeyendaControl from './leyenda/LeyendaControl.vue'

var idMapa

const props = defineProps({
  /**
   * Recibe el identificador de la capa con la que se quiere vincular la leyenda.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: ✅
   */
  para: {
    type: String,
    require: true,
  },

  /**
   * Define si se agrega el control (input) en el titulo de la leyenda. El control se vincula
   * con la visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Reactivo: ✅
   */
  sinControl: {
    type: Boolean,
    default: false,
  },
})

const sisdaiLeyenda = shallowRef()
const { sinControl } = toRefs(props)
// const emits = defineEmits(Object.values(eventos))

const capa = reactive({
  nombre: 'Cargando...',
  clases: [],
  tipo: tiposCapa.vectorial,
  visible: false,
})

/**
 *
 * @param {import("ol/layer/Layer").default} capa
 */
function vincularCapa(_capa) {
  switch (_capa.get('tipo')) {
    case tiposCapa.vectorial:
      capa.tipo = tiposCapa.vectorial
      break
    case tiposCapa.wms:
      capa.tipo = tiposCapa.wms
      break
  }

  /**
   * Vinculación con el nombre de la capa.
   */
  capa.nombre = _capa.get('nombre')
  watch(
    () => _capa.get('nombre'),
    nv => (capa.nombre = nv)
  )

  /**
   * Vinculación con la visibilidad de la capa.
   */
  capa.visible = _capa.getVisible()
  watch(
    () => _capa.getVisible(),
    nv => (capa.visible = nv)
  )
  watch(
    () => capa.visible,
    nv => _capa.setVisible(nv)
  )
}

onMounted(() => {
  // console.log('SisdaiLeyenda', props.para)
  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiLeyenda.value)

  // usarRegistroMapas().mapaPromesa(idMapa).then(vincularCapa)
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => mapa.buscarCapaPromesa(props.para))
    .then(vincularCapa)
})

onUnmounted(() => {})
</script>

<template>
  <div
    ref="sisdaiLeyenda"
    class="sisdai-mapa-leyenda"
  >
    <div class="control-capa">
      <LeyendaControl
        :id="`${para}-control`"
        :etiqueta="capa.nombre"
        :simbolo="{}"
        :encendido="capa.visible"
        :sinControl="sinControl"
        :tipoCapa="capa.tipo"
        @alCambiar="valor => (capa.visible = valor)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.sisdai-mapa-leyenda .controles-clases-capa {
  display: flex;
  flex-direction: column;
}
</style>
