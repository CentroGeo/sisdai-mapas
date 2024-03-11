<script setup>
import { onMounted, reactive, ref, shallowRef, toRefs, watch } from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai } from '../utiles'
import { tiposCapa } from '../valores/capa'
import SisdaiLeyendaWms from './SisdaiLeyendaWms.vue'

const props = defineProps({
  /**
   * Recibe el identificador de la capa con la que se quiere vincular la leyenda.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: ❌
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

  /**
   * Define si se agrega el control (input) en las clases de la leyenda. Cada control se vincula
   * con la visibilidad los elementos que pertenezcan a la clase correspondiente de la capa.
   */
  sinControlClases: {
    type: Boolean,
    default: false,
  },
})

var idMapa
const sisdaiLeyendaNueva = shallowRef()
const { sinControl, sinControlClases } = toRefs(props)

const capa = reactive({
  nombre: 'Cargando...',
  clases: [],
  tituloClases: 'titulo-clases',
  visible: false,
})

const wms = reactive({
  fuente: undefined,
  capa: undefined,
  estilo: undefined,
})

const filtroLeyenda = ref(undefined)

function actualizarParametros(params) {
  wms.capa = params.LAYERS
  wms.estilo = params.STYLES
}

/**
 *
 * @param {import("ol/layer/Layer").default} capa
 */
function vincularCapa(_capa) {
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
    nv => _capa.setVisible(Array.isArray(nv) ? nv.some(v => v) : nv)
  )

  if (_capa.get('tipo') === tiposCapa.wms) {
    wms.fuente = _capa.getSource().getUrl()
    actualizarParametros(_capa.getSource().getParams())
    watch(() => _capa.getSource().getParams(), actualizarParametros, {
      deep: true,
    })

    watch(filtroLeyenda, nv => _capa.set('filtroLeyenda', nv))
  }
}

onMounted(() => {
  // console.log('SisdaiLeyendaNueva', props.para)
  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiLeyendaNueva.value)

  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => mapa.buscarCapaPromesa(props.para))
    .then(vincularCapa)
})
</script>

<template>
  <div ref="sisdaiLeyendaNueva">
    <SisdaiLeyendaWms
      :fuenteCapa="wms.fuente"
      :capa="wms.capa"
      :tituloCapa="capa.nombre"
      :visibilidadCapa="capa.visible"
      :sinControl="sinControl"
      :sinControlClases="sinControlClases"
      @alCambiarFiltroLeyenda="valor => (filtroLeyenda = valor)"
      @alCambiarVisibilidad="valor => (capa.visible = valor)"
    />
  </div>
</template>
