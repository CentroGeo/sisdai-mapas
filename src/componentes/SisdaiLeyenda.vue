<script setup>
import { buscarContenedorSisdaiMapa, idAleatorio } from '@/utiles'
import { getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue'
import usarRegistroMapas from '@/composables/usarRegistroMapas'

const props = defineProps({
  para: {
    type: String,
    require: true,
  },
})

var idMapa = buscarContenedorSisdaiMapa(getCurrentInstance())

const idCheck = `${props.para}-${idAleatorio()}`

const visible = ref(false)
const nombre = ref('')

function vincularCapa(mapa) {
  // console.log(mapa)

  visible.value = mapa
    .getAllLayers()
    .find(_capa => _capa.get('id') === props.para)
    .getVisible()
  watch(visible, nv => {
    mapa
      .getAllLayers()
      .find(_capa => _capa.get('id') === props.para)
      .setVisible(nv)
  })

  nombre.value = mapa
    .getAllLayers()
    .find(_capa => _capa.get('id') === props.para)
    .get('nombre')
  watch(
    () =>
      mapa
        .getAllLayers()
        .find(_capa => _capa.get('id') === props.para)
        .get('nombre'),
    nv => {
      console.log('SisdaiLeyenda, nombre cambiado', nv)
      nombre.value = nv
    }
  )
}

onMounted(() => {
  console.log('SisdaiLeyenda')
  // console.log(`buscar capa ${props.para} en mapa ${idMapa}`)

  usarRegistroMapas().mapaPromesa(idMapa).then(vincularCapa)
})

onUnmounted(() => {})
</script>

<template>
  <span>
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
