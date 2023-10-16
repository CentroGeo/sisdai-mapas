<script setup>
import { onMounted, ref, shallowRef, toRaw, watch } from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import {
  buscarIdContenedorHtmlSisdai,
  valorarTipoGeometriaTexo,
} from '../utiles'
import { tipoCapa } from '../valores/capa'
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
})

const sisdaiLeyenda = shallowRef()

const nombre = ref('Cargando...')
const visible = ref(false)
const simbolo = ref(undefined)
const clases = ref([])

function simboloDesdeWms(obj) {
  return {
    estilo: Object.values(obj)[0],
    geometria: valorarTipoGeometriaTexo(Object.keys(obj)[0]),
  }
}

/**
 *
 * @param {import("ol/source/ImageLayer").default} capa
 */
function estiloWms(capa) {
  console.log('buscar estilo remoto')

  const url =
    //
    `${capa.getUrl()}?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=${
      capa.getParams().LAYERS
    }`
  // 'https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=hcti_centros_invest_conahcyt_0421_xy_p'
  // 'https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=gref_corredores_red_nac_caminos_21_nal_l'
  // 'https://dadsigvisgeo.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=vacunacion%3Abackground_limites_210521'

  fetch(url)
    .then(r => r.json())
    .then(({ Legend }) => {
      // console.log(Legend[0].rules)
      const reglas = Legend[0].rules

      if (reglas.length === 1) {
        clases.value = []

        simbolo.value = simboloDesdeWms(reglas[0].symbolizers[0])
      } else if (reglas.length > 1) {
        simbolo.value = undefined

        clases.value = reglas.map(regla => {
          return {
            simbolo: simboloDesdeWms(regla.symbolizers[0]),
            etiqueta: regla.title,
          }
        })
      }
    })
}

/**
 *
 * @param {import("ol/layer/Layer").default} capa
 */
function vincularCapa(_capa) {
  switch (_capa.get('tipo')) {
    case tipoCapa.vectorial:
      break
    case tipoCapa.wms:
      estiloWms(toRaw(_capa.getSource()))
      break
  }

  /**
   *
   */
  nombre.value = _capa.get('nombre')
  watch(
    () => _capa?.get('nombre'),
    nv => (nombre.value = nv)
  )

  /**
   *
   */
  visible.value = _capa.getVisible()
  watch(
    () => _capa.getVisible(),
    nv => (visible.value = nv)
  )
  watch(
    () => visible.value,
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
  <span
    ref="sisdaiLeyenda"
    class="sisdai-leyenda"
  >
    <!-- <p v-if="clases.length === 1">{{ nombre }}</p> -->
    <LeyendaControl
      :simbolo="simbolo"
      :etiqueta="nombre"
    />

    <div
      v-if="clases.length > 1"
      class="m-l-1 lista"
    >
      <LeyendaControl
        v-for="clase in clases"
        :key="clase"
        :sinControl="true"
        :simbolo="clase.simbolo"
        :etiqueta="clase.etiqueta"
      />
    </div>
  </span>
</template>

<style lang="scss">
.sisdai-leyenda .lista {
  display: flex;
  flex-direction: column;
}
</style>
