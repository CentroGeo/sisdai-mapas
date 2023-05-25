<script setup>
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import { idAleatorio } from '@/utiles'
import 'ol/ol.css'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
})

const mapa = ref(null)

onMounted(() => {
  console.log('SisdaiMapa')
  usarRegistroMapas().registrarMapa(props.id, mapa.value)
})

onUnmounted(() => {
  usarRegistroMapas().borrarMapa(props.id)
})
</script>

<template>
  <div
    :sisdai-mapa="id"
    class="sisdai-mapa"
  >
    <h1>Hola, soy un contenedor de mapa 😎 [{{ id }}]</h1>

    <figure
      ref="mapa"
      class="mapa"
    />

    <slot />
  </div>
</template>

<style>
.sisdai-mapa {
  width: 100%;
  border: solid 1px tomato;
}

.sisdai-mapa .mapa {
  width: 100%;
  height: 400px;
}
</style>
