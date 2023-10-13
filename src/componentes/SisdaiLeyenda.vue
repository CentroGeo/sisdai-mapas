<script setup>
import { onMounted, reactive, shallowRef, watch } from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from '../utiles'

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
  // estilo: parseEstilo(estiloVector),
})

/**
 *
 * @param {import("ol/layer/Layer").default} capa
 */
function vincularCapa(_capa) {
  // console.log('capa', _capa)

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
    class="controlador-vis"
  >
    <span class="figura-variable" />

    <input
      type="checkbox"
      :id="idCheck"
      v-model="capa.visible"
    />
    <label
      class="nombre-variable"
      :for="idCheck"
    >
      {{ capa.nombre }}
    </label>
  </span>
</template>
