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
  <li
    class="controlador-vis"
    :style="{
      '--controlador-vis-figura-alto': `${simbolo?.tamanio}px`,
    }"
  >
    <template v-if="sinControl">
      <p class="lectura">
        <LeyendaSimbolo
          v-if="simbolo"
          :simbolo="simbolo"
        />
        <span class="nombre-variable">
          {{ etiqueta }}
        </span>
      </p>
    </template>
    <template v-else>
      <input
        type="checkbox"
        :id="idCheck"
        :checked="encendido"
        @input="$emit('alCambiar', $event.target.checked)"
      />
      <label :for="idCheck">
        <LeyendaSimbolo
          v-if="simbolo"
          :simbolo="simbolo"
        />
        <span class="nombre-variable">
          {{ etiqueta }}
        </span>
      </label>
    </template>
  </li>
</template>
