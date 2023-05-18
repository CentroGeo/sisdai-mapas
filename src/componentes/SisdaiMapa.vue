<script setup>
import { idAleatorio } from '@/utiles'
import { onMounted, onUnmounted, ref } from 'vue'
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import 'ol/ol.css'

const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
})

const mapa = ref(null)

onMounted(() => {
  usarRegistroMapas().registrarMapa(props.id, mapa.value)
})

onUnmounted(() => {
  usarRegistroMapas().borrarMapa(props.id)
})
</script>

<template>
  <div class="sisddai-mapa">
    <h1>Hola, soy un contenedor de mapa 😎 [{{ id }}]</h1>

    <div
      ref="mapa"
      class="mapa"
    />

    <slot />
  </div>
</template>

<style>
.sisddai-mapa {
  width: 100%;
  border: solid 1px tomato;
}

.sisddai-mapa .mapa {
  width: 100%;
  height: 400px;
}
</style>
