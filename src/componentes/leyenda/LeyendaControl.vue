<script setup>
import { toRefs } from 'vue'
import { idAleatorio } from '../../utiles'
import LeyendaSimbolo from './LeyendaSimbolo.vue'

const props = defineProps({
  tipoControl: {},

  etiqueta: {
    typo: String,
    default: 'Cargando...',
  },

  estilo: {
    typo: Object,
    default: undefined,
  },
})

const idCheck = `${props.para}-${idAleatorio()}`

const { etiqueta } = toRefs(props)
</script>

<template>
  <span :class="{ 'controlador-vis': estilo }">
    <!-- <span class="figura-variable" /> -->
    <LeyendaSimbolo v-if="estilo" />

    <input
      type="checkbox"
      :id="idCheck"
    />

    <label
      :class="{ 'nombre-variable': estilo }"
      :for="idCheck"
    >
      {{ etiqueta }}
    </label>
  </span>
</template>
