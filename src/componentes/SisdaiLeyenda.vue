<script setup>
import { onMounted, onUnmounted, reactive, shallowRef, watch } from 'vue'
import usarRegistroMapas from './../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from './../utiles'

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
})

/**
 *
 * @param {import("ol/layer/Layer").default} capa
 */
function vincularCapa(_capa) {
  console.log('capa', _capa)

  /**
   *
   */
  capa.visible = _capa.getVisible()
  watch(
    () => capa.visible,
    nv => _capa.setVisible(nv)
  )

  /**
   *
   */
  capa.nombre = _capa.get('nombre')
  watch(
    () => _capa?.get('nombre'),
    nv => (capa.nombre = nv)
  )
}

onMounted(() => {
  console.log('SisdaiLeyenda', props.para)
  // console.log(`buscar capa ${props.para} en mapa ${idMapa}`)

  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiLeyenda.value)

  // usarRegistroMapas().mapaPromesa(idMapa).then(vincularCapa)
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => mapa.buscarCapaPromesa(props.para))
    .then(vincularCapa)
})

onUnmounted(() => {})
</script>

<template>
  <span ref="sisdaiLeyenda">
    <!-- <h2>Hola, soy una leyenda 😇 para: {{ para }}</h2> -->

    <form>
      <input
        type="checkbox"
        :id="idCheck"
        v-model="capa.visible"
      />
      <label :for="idCheck">{{ capa.nombre }}</label>
    </form>
  </span>
</template>
