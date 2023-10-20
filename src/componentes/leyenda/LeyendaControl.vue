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

  tipoControl: {},

  tipoCapa: {
    typo: String,
    required: true,
  },
})

const idCheck = `${props.id}-${idAleatorio()}`

const { etiqueta, simbolo, sinControl, encendido } = toRefs(props)

defineEmits(['alCambiar'])

// const paddingLeftNombreVariable = computed(() =>
//   simbolo.value ? '64px' : '40px'
// )
</script>

<template>
  <span
    class="controlador-vis"
    :class="{ 'sin-simbolo': simbolo === undefined, 'sin-control': sinControl }"
  >
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
      :checked="encendido"
      @input="$emit('alCambiar', $event.target.checked)"
    />

    <label
      class="nombre-variable"
      :for="!sinControl ? idCheck : undefined"
    >
      {{ etiqueta }}
    </label>
  </span>
</template>

<style lang="scss">
.sisdai-mapa-leyenda {
  .sin-control {
    .nombre-variable {
      color: var(--tipografia-color);
    }

    &.controlador-vis {
      padding: 9px;

      .figura-variable {
        margin-left: 5px;
        margin-top: 0;
      }

      .nombre-variable {
        padding-left: 0px;
        margin-left: 28px;
      }
    }
  }

  .sin-simbolo .nombre-variable {
    padding-left: 40px;
  }
}
</style>
