<script setup>
import ImageLayer from 'ol/layer/Image'
import { ImageSourceEventType } from 'ol/source/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { computed, onMounted, ref, shallowRef, toRefs, watch } from 'vue'
import { tiposCapa } from '../valores/capa'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import eventos from './../eventos/capa'
import SisdaiUtfGrid from './SisdaiUtfGrid.vue'

const props = defineProps({
  capa: {
    type: String,
    default: undefined,
  },

  estilo: {
    type: String,
    default: undefined,
  },

  filtro: {
    type: String,
    default: undefined,
  },

  globoInformativo: {
    type: Function,
    default: undefined,
  },

  /**
   * Parámetros de solicitud WMS. El atributo LAYERS (nombre de las capas separadas por comas) es obligatorio.
   * Para revisar los valores por defecto consulte el [modulo WMS de OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_source_wms.html).
   *
   * - Tipo: `Object`
   * - Valor por defecto: `{}`.
   * - Reactivo: ✅
   */
  parametros: {
    type: Object,
    default: () => ({}),
    // validator({ LAYERS }) {
    //   const validarLayer = LAYERS !== undefined && LAYERS !== null

    //   if (!validarLayer) {
    //     console.warn('LAYERS no puede ser un parámetro indefinido o vacío')
    //   }

    //   return validarLayer
    // },
  },

  /**
   * Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o qgis.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'geoserver'`.
   * - Reactivo: ❌
   *
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_wms.html#~ServerType
   */
  tipoServidor: {
    type: String,
    default: 'geoserver',
  },

  /**
   * Titulo de las clases de la leyenda, solo aplica si la capa cuenta con reglas de estilo de clasificación.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`.
   * - Reactivo: ✅
   */
  tituloClases: {
    type: String,
    default: undefined,
  },

  /**
   * URL del servicio WMS.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`.
   * - Reactivo: ❌
   */
  url: {
    type: String,
    default: 'https://gema.conahcyt.mx/geoserver/wms',
  },

  ...propsCapa,
})

const emits = defineEmits(Object.values(eventos))

const sisdaiCapaWms = shallowRef()
const {
  capa,
  estilo,
  filtro,
  globoInformativo,
  url,
  parametros,
  posicion,
  tituloClases,
} = toRefs(props)

const filtroLeyenda = ref(undefined)
const filtroCompleto = computed(() => {
  if (filtro.value === undefined && filtroLeyenda.value === undefined) {
    return undefined
  }

  return [filtro.value, filtroLeyenda.value]
    .filter(f => f !== undefined)
    .map(f => `(${f})`)
    .join(' AND ')
})

const { agregada, configurar } = usarCapa(sisdaiCapaWms, props)

configurar(() => {
  const olSource = new ImageWMS({
    url: url.value,
    // params: parametros.value,
    params: {
      LAYERS: capa.value || parametros.value.LAYERS,
      CQL_FILTER: filtroCompleto.value,
      STYLE: estilo.value || parametros.value.STYLE,
    },
    serverType: props.tipoServidor,
    crossOrigin: 'Anonymous',
  })

  olSource.on(ImageSourceEventType.IMAGELOADSTART, () => {
    emits(eventos.alIniciarCarga)
    // estatusCarga.value = tiposEstatusCarga.ini
  })
  olSource.on(ImageSourceEventType.IMAGELOADERROR, () => {
    emits(eventos.alFinalizarCarga, false)
    // estatusCarga.value = tiposEstatusCarga.error
  })
  olSource.on(ImageSourceEventType.IMAGELOADEND, () => {
    emits(eventos.alFinalizarCarga, true)
    // estatusCarga.value = tiposEstatusCarga.fin
  })

  return { olSource, olLayerClass: ImageLayer, tipo: tiposCapa.wms }
})

agregada(_capa => {
  // console.log(_capa.getSource())
  // _capa.set('parametros', parametros.value)
  _capa.set('tituloClases', tituloClases.value)

  watch([estilo, filtroCompleto], () => {
    // console.log(nv)
    _capa.getSource().updateParams({
      LAYERS: capa.value || parametros.value.LAYERS,
      CQL_FILTER: filtroCompleto.value,
      STYLE: estilo.value || parametros.value.STYLE,
    })
  })

  // watch(parametros, nv => _capa.set('parametros', nv))
  // watch(parametros, nv => _capa.getSource().updateParams(nv))
  // watch(tituloClases, nv => _capa.set('tituloClases', nv))

  watch(
    () => _capa.get('filtroLeyenda'),
    nv => (filtroLeyenda.value = nv)
  )
})

onMounted(() => {
  // console.log('SisdaiCapaWms', props.id)
})
</script>

<template>
  <span
    ref="sisdaiCapaWms"
    :sisdai-capa="id"
  />
  <SisdaiUtfGrid
    v-if="globoInformativo !== undefined"
    :capa="capa"
    :estilo="estilo"
    :globoInformativo="globoInformativo"
    :posicion="posicion"
    :filtro="filtroCompleto"
    :fuente="props.url"
  />
</template>
