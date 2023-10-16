<script setup>
import { toRefs } from 'vue'
import { idAleatorio } from '../../utiles'
import LeyendaSimbolo from './LeyendaSimbolo.vue'

const props = defineProps({
  etiqueta: {
    typo: String,
    default: 'Cargando...',
  },

  sinControl: {
    typo: Boolean,
    default: false,
  },

  simbolo: {
    typo: Object,
    default: undefined,
  },

  tipoControl: {},

  tipoCapa: {
    typo: String,
    required: true,
  },

  modelValue: {
    type: Boolean,
    default: false,
  },
})

const idCheck = `${props.para}-${idAleatorio()}`

const { etiqueta, simbolo, sinControl, modelValue } = toRefs(props)

defineEmits(['update:modelValue'])
</script>

<template>
  <span :class="{ 'controlador-vis': simbolo, 'sin-control': sinControl }">
    <!-- <span class="figura-variable" /> -->
    <LeyendaSimbolo
      v-if="simbolo"
      :estilo="simbolo.estilo"
      :geometria="simbolo.geometria"
      :tipoCapa="tipoCapa"
    />

    <input
      v-if="!sinControl"
      type="checkbox"
      :id="idCheck"
      :checked="modelValue"
      @input="$emit('update:modelValue', $event.target.checked)"
      :tabindex="undefined"
    />

    <label
      :class="{ 'nombre-variable': simbolo }"
      :for="idCheck"
    >
      {{ etiqueta }}
    </label>
  </span>
</template>

<style lang="scss">
.controlador-vis.sin-control {
  padding: 9px;

  .figura-variable {
    margin-left: 5px;
    margin-top: 0;
  }

  input + label,
  .nombre-variable {
    padding-left: 0px;
    margin-left: 28px;
    color: var(--tipografia-color);
  }
}
</style>
