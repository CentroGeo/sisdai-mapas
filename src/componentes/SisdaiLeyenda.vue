<script setup>
import { onMounted, reactive, shallowRef, watch } from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import {
  buscarIdContenedorHtmlSisdai,
  idAleatorio,
  valorarTipoCapa,
} from '../utiles'
import { tipoCapa } from './../valores/capa'
import SisdaiSimbologia from './SisdaiSimbologia.vue'

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
const idCheck = `${props.para}-${idAleatorio()}`

const capa = reactive({
  visible: false,
  nombre: 'Cargando...',
  // estilo: traducirEstilo(estiloVector),
  estilo: undefined,
  tipo: undefined,
  geometria: undefined,
})

/**
 *
 * @param {import("ol/layer/Layer").default} capa
 */
function vincularCapa(_capa) {
  // console.log('capa', _capa)

  capa.tipo = valorarTipoCapa(_capa)
  if (capa.tipo === tipoCapa.vectorial) {
    capa.geometria = _capa?.get('geometria')
  }

  /**
   *
   */
  capa.estilo = _capa?.get('estilo')
  watch(
    () => _capa?.get('estilo'),
    nv => (capa.estilo = nv)
  )

  /**
   *
   */
  capa.nombre = _capa?.get('nombre')
  watch(
    () => _capa?.get('nombre'),
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
  <span
    ref="sisdaiLeyenda"
    :class="{ 'controlador-vis': capa.tipo !== tipoCapa.xyz }"
  >
    <!-- <span class="figura-variable" /> -->
    <SisdaiSimbologia
      v-if="capa.tipo !== tipoCapa.xyz"
      :estiloCapa="capa.estilo"
      :tipoCapa="capa.tipo"
      :geometriaCapa="capa.geometria"
    />

    <input
      type="checkbox"
      :id="idCheck"
      v-model="capa.visible"
    />
    <label
      :class="{ 'nombre-variable': capa.tipo !== tipoCapa.xyz }"
      :for="idCheck"
    >
      {{ capa.nombre }}
    </label>
  </span>
</template>
