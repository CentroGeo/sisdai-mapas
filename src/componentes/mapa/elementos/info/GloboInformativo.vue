<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  contenido: {
    type: String,
    default: undefined
  },
  pixel: {
    type: Array,
    default: () => [0, 0]
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const { contenido, pixel, visible } = toRefs(props)
</script>

<template>
  <div class="globo-informacion ol-unselectable" role="tooltip" aria-live="assertive">
    <div class="globo-informacion-cuerpo">Soy un globo de información</div>
  </div>
</template>
