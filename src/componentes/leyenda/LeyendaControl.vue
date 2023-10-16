<script setup>
import { computed, toRefs } from 'vue'
import { idAleatorio } from '../../utiles'
import LeyendaSimbolo from './LeyendaSimbolo.vue'

const props = defineProps({
  tipoControl: {},

  sinControl: {
    typo: Boolean,
    default: false,
  },

  etiqueta: {
    typo: String,
    default: 'Cargando...',
  },

  simbolo: {
    typo: Object,
    default: undefined,
  },
})

const idCheck = `${props.para}-${idAleatorio()}`

const { etiqueta, simbolo, sinControl } = toRefs(props)

const sinControlCss = computed(() => ({
  margenSimbolo: sinControl.value ? '14px' : '40px',
  paddingEtiqueta: sinControl.value ? '40px' : '64px',
  visibilidadInput: sinControl.value ? 'none' : 'block',
}))
</script>

<template>
  <span :class="{ 'controlador-vis': simbolo }">
    <!-- <span class="figura-variable" /> -->
    <LeyendaSimbolo
      v-if="simbolo"
      :estilo="simbolo.estilo"
      :geometria="simbolo.geometria"
    />

    <input
      type="checkbox"
      :id="idCheck"
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
.controlador-vis {
  .figura-variable {
    margin-left: v-bind('sinControlCss.margenSimbolo');
  }

  input[type='checkbox'] {
    + label {
      padding-left: v-bind('sinControlCss.paddingEtiqueta');

      &::before {
        display: v-bind('sinControlCss.visibilidadInput');
      }
    }
  }
}
</style>
