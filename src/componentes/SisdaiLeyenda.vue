<script setup>
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdaiMapa, idAleatorio } from '@/utiles'
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

var idMapa

const props = defineProps({
  para: {
    type: String,
    require: true,
  },
})

const sisdaiLeyenda = shallowRef()
const idCheck = `${props.para}-${idAleatorio()}`

const visible = ref(false)
const nombre = ref('')

function vincularCapa(mapa) {
  // console.log(mapa)

  visible.value = mapa.buscarCapa(props.para).getVisible()
  watch(visible, nv => mapa.buscarCapa(props.para).setVisible(nv))

  nombre.value = mapa.buscarCapa(props.para).get('nombre')
  watch(
    () => mapa.buscarCapa(props.para).get('nombre'),
    nv => (nombre.value = nv)
  )
}

onMounted(() => {
  console.log('SisdaiLeyenda')
  // console.log(`buscar capa ${props.para} en mapa ${idMapa}`)

  idMapa = buscarIdContenedorHtmlSisdaiMapa(sisdaiLeyenda.value)

  usarRegistroMapas().mapaPromesa(idMapa).then(vincularCapa)
})

onUnmounted(() => {})
</script>

<template>
  <span ref="sisdaiLeyenda">
    <h2>Hola, soy una leyenda 😇 para: {{ para }}</h2>

    <form>
      <input
        type="checkbox"
        :id="idCheck"
        v-model="visible"
      />
      <label :for="idCheck">{{ nombre }}</label>
    </form>
  </span>
</template>
