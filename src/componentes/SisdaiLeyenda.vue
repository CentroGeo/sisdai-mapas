<script setup>
import { inject, onMounted, reactive, ref, toRefs, watch } from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { tiposCapa } from '../valores/capa'
import SisdaiLeyendaWmsExterna from './SisdaiLeyendaWmsExterna.vue'

const props = defineProps({
  deshabilitado: {
    type: Boolean,
    default: false,
  },

  globoInformativo: {
    type: String,
    default: undefined,
  },

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
// const sisdaiLeyenda = shallowRef()
const { deshabilitado, sinControl, sinControlClases } = toRefs(props)

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
  // console.log('SisdaiLeyenda', props.para)
  //idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiLeyenda.value)
  idMapa = inject('idMapa', 'no se encontró el id del mapa')

  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => mapa.buscarCapaPromesa(props.para))
    .then(vincularCapa)
})
</script>

<template>
  <div ref="sisdaiLeyenda">
    <SisdaiLeyendaWmsExterna
      :deshabilitado="deshabilitado"
      :capa="wms.capa"
      :fuenteCapa="wms.fuente"
      :globoInformativo="globoInformativo"
      :tituloCapa="capa.nombre"
      :visibilidadCapa="capa.visible"
      :sinControl="sinControl"
      :sinControlClases="sinControlClases"
      @alCambiarFiltroLeyenda="valor => (filtroLeyenda = valor)"
      @alCambiarVisibilidad="valor => (capa.visible = valor)"
    />
  </div>
</template>
