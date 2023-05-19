<script setup>
import { buscarContenedorSisdaiMapa, idAleatorio } from '@/utiles'
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import usarRegistroMapas from '@/composables/usarRegistroMapas'
const props = defineProps({
  para: {
    type: String,
    require: true,
  },
})

const idCheck = `${props.para}-${idAleatorio()}`
const visible = ref(false)

onMounted(() => {
  console.log('SisdaiLeyenda')

  var idMapa = buscarContenedorSisdaiMapa(getCurrentInstance())
  console.log(`buscar capa ${props.para} en mapa ${idMapa}`)

  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      console.log(mapa.getAllLayers())

      const capa = mapa
        .getAllLayers()
        .find(_capa => _capa.get('id') === props.para)

      visible.value = capa.getVisible()

      watch(visible, nv => capa.setVisible(nv))
    })
})
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
      <label :for="idCheck">Nombre de la capa</label>
    </form>
  </span>
</template>
