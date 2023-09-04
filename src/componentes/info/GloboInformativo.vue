<script setup>
import { computed, ref, toRefs } from 'vue'

// eslint-disable-next-line
const props = defineProps({
  ubicacion: {
    type: Array,
  },
  contenido: {
    type: [String, Function],
    default: undefined,
  },
})

/**
 *
 */
const { ubicacion, contenido } = toRefs(props)

/**
 *
 */
const info = ref(null)

/**
 *
 */
const left = computed(() => {
  return `${
    ubicacion.value[0] + info.value.clientWidth + 10 >
    info.value.parentElement.clientWidth
      ? ubicacion.value[0] - info.value.clientWidth - 5
      : ubicacion.value[0] + 5
  }px`
})

/**
 *
 */
const top = computed(() => {
  return `${
    ubicacion.value[1] < info.value.clientHeight + 5
      ? ubicacion.value[1] + 5
      : ubicacion.value[1] - info.value.clientHeight
  }px`
})
</script>

<template>
  <div
    id="info"
    ref="info"
    class="contenedor-tooltip-normal"
  >
    <div
      class="cuerpo-tooltip"
      v-html="contenido"
    />
  </div>
</template>

<style lang="scss">
#info {
  position: absolute;
  left: v-bind('left');
  top: v-bind('top');
}
</style>
