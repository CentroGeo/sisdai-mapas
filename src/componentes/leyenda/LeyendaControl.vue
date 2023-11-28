<script setup>
import { toRefs } from 'vue'
import { idAleatorio } from '../../utiles'
import LeyendaSimbolo from './LeyendaSimbolo.vue'

const props = defineProps({
  encendido: {
    type: Boolean,
    default: false,
  },

  etiqueta: {
    typo: String,
    default: 'Cargando...',
  },

  id: {
    type: String,
    default: () => idAleatorio(),
  },

  sinControl: {
    typo: Boolean,
    default: false,
  },

  simbolo: {
    typo: Object,
    default: undefined,
  },

  // tipoControl: {},
})

const idCheck = `${props.id}-${idAleatorio()}`

const { etiqueta, simbolo, sinControl, encendido } = toRefs(props)

defineEmits(['alCambiar'])
</script>

<template>
  <div
    class="controlador-vis"
    :class="{ 'sin-simbolo': simbolo === undefined, 'sin-control': sinControl }"
  >
    <input
      v-if="!sinControl"
      type="checkbox"
      :id="idCheck"
      :checked="encendido"
      @input="$emit('alCambiar', $event.target.checked)"
    />

    <label
      class="nombre-variable"
      :for="!sinControl ? idCheck : undefined"
    >
      <!-- <span class="figura-variable" /> -->
      <LeyendaSimbolo
        v-if="simbolo"
        :simbolo="simbolo"
      />
      <span class="nombre-variable">
        {{ etiqueta }}
      </span>
    </label>
  </div>
</template>

<style lang="scss"></style>
