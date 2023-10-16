<script setup>
import { onMounted, ref, shallowRef, toRaw, watch } from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai } from '../utiles'
import { tipoCapa, tipoGeometria } from '../valores/capa'
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

const clases = ref([])

/**
 *
 * @param {import("ol/source/ImageLayer").default} capa
 */
function estiloWms(capa) {
  console.log('buscar estilo remoto')

  const url = `${capa.getUrl()}?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=${
    capa.getParams().LAYERS
  }`
  // const url = 'https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=hcti_centros_invest_conahcyt_0421_xy_p'
  // const url = 'https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=gref_corredores_red_nac_caminos_21_nal_l'
  // const url = 'https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=hcti_snii_sexo_22_est_a'

  fetch(url)
    .then(r => r.json())
    .then(({ Legend }) => {
      // console.log(Legend[0].rules)
      const reglas = Legend[0].rules

      if (reglas.length === 1) {
        console.log('asgignar un solo estilo')
      } else if (reglas.length > 1) {
        // estilo.value = undefined

        clases.value = reglas.map(regla => {
          return {
            simbolo: {
              estilo: regla.symbolizers[0].Polygon,
              geometria: tipoGeometria.poligono,
            },
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
    <LeyendaControl :etiqueta="nombre" />

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
