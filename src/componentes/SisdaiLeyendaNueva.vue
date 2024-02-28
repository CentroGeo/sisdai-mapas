<script setup>
import { onMounted, reactive, shallowRef, watch } from 'vue'
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
})

var idMapa
const sisdaiLeyendaNueva = shallowRef()

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
  filtro: undefined,
})

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
  console.log(capa.visible)
  watch(
    () => _capa.getVisible(),
    nv => (capa.visible = nv)
  )
  watch(
    () => capa.visible,
    nv => _capa.setVisible(nv)
  )

  if (_capa.get('tipo') === tiposCapa.wms) {
    wms.fuente = _capa.getSource().getUrl()
    actualizarParametros(_capa.getSource().getParams())
    watch(() => _capa.getSource().getParams(), actualizarParametros, {
      deep: true,
    })
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

// function ver(params) {
//   console.log('ver:', params)
// }
</script>

<template>
  <div ref="sisdaiLeyendaNueva">
    <!-- <p>hola</p> -->
    <SisdaiLeyendaWms
      :fuenteCapa="wms.fuente"
      capa="gref_division_estatal_20_est_a"
      :tituloCapa="capa.nombre"
      :visibilidadCapa="capa.visible"
      @alCambiarVisibilidad="valor => (capa.visible = valor)"
    />
  </div>
</template>
