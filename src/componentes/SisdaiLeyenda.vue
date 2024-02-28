<script setup>
import { onMounted, reactive, shallowRef, toRefs, watch } from 'vue'
import SimboloSvgLeyenda from '../clases/SimboloSvgLeyenda'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai, fetchJSON } from '../utiles'
import {
  acomodarFormaDesdeVector,
  estiloContiene,
  estiloParaSvg,
  estiloParaSvgPunto,
} from '../utiles/estiloVectores'
import { tiposCapa } from '../valores/capa'
import { acomodarReglasWms } from './../utiles/leyenda'
import LeyendaControl from './leyenda/LeyendaControl.vue'

var idMapa

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
    default: true,
  },
})

const sisdaiLeyenda = shallowRef()
const { sinControl, sinControlClases } = toRefs(props)

const capa = reactive({
  nombre: 'Cargando...',
  clases: [],
  tituloClases: 'titulo-clases',
  visible: false,
})

function actualizarClaseVector(estilo, geometria) {
  let _estilo = JSON.parse(estilo)
  // console.log(_estilo)
  let tamanio, icono, puntosForma

  if (geometria === 'punto') {
    if (estiloContiene(_estilo, 'icon')) {
      icono = _estilo['icon-src']
    } else {
      tamanio = _estilo['circle-radius'] * 2
      if (estiloContiene(_estilo, 'shape')) {
        puntosForma = acomodarFormaDesdeVector(_estilo)
        // puntosForma = undefined
        _estilo = estiloParaSvgPunto(_estilo, 'shape')
        // console.log(puntosForma)
      } else {
        _estilo = estiloParaSvgPunto(_estilo)
      }
    }
  } else {
    _estilo = estiloParaSvg(_estilo)
  }

  const simbolo = new SimboloSvgLeyenda({
    estilo: _estilo,
    forma: puntosForma,
    geometria,
    icono,
    tamanio,
  })
  // console.log(simbolo.xml)

  capa.clases = [
    {
      simbolo,
    },
  ]
}

function actualizarClasesDesdeWms(_url, params) {
  const url =
    //
    `${_url}?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=${
      params.LAYERS
    }&STYLE=${params.STYLES ? params.STYLES : ''}`

  fetchJSON(url).then(data => {
    const clases = acomodarReglasWms(data)
    // console.log(clases)

    capa.clases = clases
  })
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
    nv => _capa.setVisible(nv)
  )

  capa.tituloClases = _capa.get('tituloClases')
  watch(
    () => _capa.get('tituloClases'),
    nv => (capa.tituloClases = nv)
  )

  if (_capa.get('tipo') === tiposCapa.vectorial) {
    actualizarClaseVector(_capa.get('estilo2'), _capa.get('geometria'))
    watch(
      () => _capa.get('estilo2'),
      nv => actualizarClaseVector(nv, _capa.get('geometria')),
      { deep: true }
    )
  }

  if (_capa.get('tipo') === tiposCapa.wms) {
    const fuente = _capa.getSource().getUrl()
    actualizarClasesDesdeWms(fuente, _capa.getSource().getParams())
    watch(
      () => _capa.getSource().getParams(),
      nv => actualizarClasesDesdeWms(fuente, nv),
      { deep: true }
    )
  }
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

// onUnmounted(() => {})
</script>

<template>
  <ul
    ref="sisdaiLeyenda"
    class="sisdai-mapa-leyenda casillas-anidadas"
  >
    <li class="leyenda-titulo">
      <LeyendaControl
        :id="`${para}-control`"
        :etiqueta="capa.nombre"
        :simbolo="capa.clases.length === 1 ? capa.clases[0].simbolo : undefined"
        :encendido="capa.visible"
        :sinControl="sinControl"
        @alCambiar="valor => (capa.visible = valor)"
      />
    </li>

    <ul
      v-if="capa.clases.length > 1"
      class="leyenda-clases casillas-subseleccion"
    >
      <p
        class="titulo-clases m-y-1"
        v-if="capa.tituloClases"
      >
        {{ capa.tituloClases }}
      </p>
      <LeyendaControl
        v-for="(clase, idx) in capa.clases"
        :key="`${para}-clase-control-${idx}`"
        :id="`${para}-clase-control-${idx}`"
        :etiqueta="clase.titulo"
        :simbolo="clase.simbolo"
        :sinControl="sinControlClases"
      />
    </ul>
  </ul>
</template>

<style lang="scss">
.sisdai-mapa-leyenda .leyenda-clases .titulo-clases {
  font-size: 1rem;
  line-height: 1.25em;
  font-weight: 400;
}
</style>
