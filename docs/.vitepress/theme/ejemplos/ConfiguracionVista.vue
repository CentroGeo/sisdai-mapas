<script setup>
import { computed, ref } from 'vue'

const atributos = {
  acercamiento: 6.3,
  centro: '-115.0969,30.5499',
  extension: '-92.3263,19.5512,-87.5331,22.586',
  extensionMargen: 50,
}

const vista = ref({})
const seleccion = computed({
  get: () => Object.keys(vista.value),
  set: nv =>
    (vista.value = nv.reduce((a, b) => ({ ...a, [b]: atributos[b] }), {})),
})
</script>

<template>
  <SisdaiMapa
    descripcion="Este mapa es un ejemplo de como configurar la vista del mapa para ajustarlo conforme a las necesidades de cada proyecto."
    :vista="vista"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">
        Ejemplo de la configuración de la vista del mapa
      </p>
    </template>

    <SisdaiCapaXyz />

    <template #panel-pie-vis>
      <form
        v-on:submit.prevent
        class="flex flex-contenido-equidistante"
      >
        <span
          v-for="(val, name) in atributos"
          :key="`casilla-${name}`"
        >
          <input
            :id="`casilla-${name}`"
            type="checkbox"
            v-model="seleccion"
            :value="name"
          />
          <label :for="`casilla-${name}`">{{ name }}: {{ val }}</label>
        </span>
      </form>
    </template>
  </SisdaiMapa>
</template>
