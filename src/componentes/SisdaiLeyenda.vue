<script setup>
import { onMounted, reactive, shallowRef, toRaw, toRefs, watch } from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import {
  buscarIdContenedorHtmlSisdai,
  valorarTipoGeometriaTexo,
} from '../utiles'
import { estiloVector, tiposCapa } from '../valores/capa'
import LeyendaControl from './leyenda/LeyendaControl.vue'

var idMapa

const props = defineProps({
  /**
   *
   */
  para: {
    type: String,
    require: true,
  },

  sinControl: {
    type: Boolean,
    default: false,
  },
})

const sisdaiLeyenda = shallowRef()
const capa = reactive({
  nombre: 'Cargando...',
  clases: [],
  simbolo: undefined,
  tipo: tiposCapa.vectorial,
  visible: false,
})

const { sinControl } = toRefs(props)

function simboloDesdeWms(obj) {
  return {
    estilo: Object.values(obj)[0],
    geometria: valorarTipoGeometriaTexo(Object.keys(obj)[0]),
  }
}

/**
 *
 * @param {import("ol/source/ImageLayer").default} _capa
 */
function estiloWms(_url, params) {
  const url =
    //
    `${_url}?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=${
      params.LAYERS
    }&STYLE=${params.STYLES ? params.STYLES : ''}`
  // 'https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=hcti_centros_invest_conahcyt_0421_xy_p'
  // 'https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=gref_corredores_red_nac_caminos_21_nal_l'
  // 'https://dadsigvisgeo.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=vacunacion%3Abackground_limites_210521'
  // 'https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=salu_egresos_plaguicidas_10_20_loc_p&style=salu_egresos_plaguicidas_10_20_loc_p'

  fetch(url, {})
    .then(r => {
      // Verificar el estado de la respuesta
      if (!r.ok) {
        throw new Error('La solicitud no pudo completarse con éxito')
      }
      // Analizar la respuesta como JSON
      return r.json()
    })
    .then(({ Legend }) => {
      // console.log(Legend[0].rules)
      const reglas = Legend[0].rules

      if (reglas.length === 1) {
        capa.clases = []

        capa.simbolo = simboloDesdeWms(reglas[0].symbolizers[0])
      } else if (reglas.length > 1) {
        capa.simbolo = undefined

        capa.clases = reglas.map(regla => ({
          simbolo: simboloDesdeWms(regla.symbolizers[0]),
          etiqueta: regla.title ? regla.title : regla.name,
        }))
      }

      // console.log('leyenda cargada')
      // console.log(toRaw(usarRegistroMapas().mapa(idMapa)))
    })
    .catch(error => {
      // Manejar errores de la solicitud
      console.warn(
        `Error en la solicitud de los datos remotos en la leyenda de la capa ${capa.tipo} ${props.para}:`,
        error
      )

      // console.log('leyenda cargada')
    })
}

function _estiloVector(geometria) {
  // si hay reglas, añadirlas en las clases
  // si no:
  capa.clases = []

  capa.simbolo = {
    estilo: estiloVector,
    geometria,
  }
}

/**
 *
 * @param {import("ol/layer/Layer").default} capa
 */
function vincularCapa(_capa) {
  switch (_capa.get('tipo')) {
    case tiposCapa.vectorial:
      capa.tipo = tiposCapa.vectorial
      _estiloVector(_capa.get('geometria'), toRaw(_capa.get('estilo')))
      break
    case tiposCapa.wms:
      capa.tipo = tiposCapa.wms
      estiloWms(_capa.getSource().getUrl(), _capa.getSource().getParams())
      watch(
        () => _capa.get('parametros'),
        () =>
          estiloWms(_capa.getSource().getUrl(), _capa.getSource().getParams())
      )
      break
  }

  /**
   *
   */
  capa.nombre = _capa.get('nombre')
  watch(
    () => _capa.get('nombre'),
    nv => (capa.nombre = nv)
  )

  /**
   *
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
        :simbolo="capa.simbolo"
        :encendido="capa.visible"
        :sinControl="sinControl"
        :tipoCapa="capa.tipo"
        @alCambiar="valor => (capa.visible = valor)"
      />
    </div>

    <div
      v-if="capa.clases.length > 1"
      class="m-l-1 controles-clases-capa"
    >
      <LeyendaControl
        v-for="(clase, idx) in capa.clases"
        :key="`${para}-clase-control-${idx}`"
        :id="`${para}-clase-control-${idx}`"
        :etiqueta="clase.etiqueta"
        :simbolo="clase.simbolo"
        :sinControl="true"
        :tipoCapa="capa.tipo"
      />
    </div>
  </div>
</template>

<style lang="scss">
.sisdai-mapa-leyenda .lista-clases {
  display: flex;
  flex-direction: column;
}
</style>
