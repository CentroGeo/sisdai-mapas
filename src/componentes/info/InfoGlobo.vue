<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  contenido: {
    type: String,
    default: undefined,
  },
  pixel: {
    type: Array,
    default: undefined,
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

const { contenido, pixel } = toRefs(props)

const posicionCalculada = computed(() => {
  if (pixel.value === undefined) {
    return [undefined, undefined]
  }

  return pixel.value
})
</script>

<template>
  <div
    class="contenedor-globo-info"
    :class="{ esconder: !visible }"
    :style="`left: ${posicionCalculada[0]}px; top: ${posicionCalculada[1]}px;`"
    aria-live="assertive"
  >
    <div
      class="cuerpo-globo-info"
      v-html="contenido"
    />
    <!-- <div class="cuerpo-globo-info">
      <b>Lorem ipsum dolor sit amet</b> consectetur adipisicing elit. Odio
      omnis, quas sequi mollitia dolorem enim molestiae tempore temporibus
      fugiat esse sed, voluptatem expedita porro cupiditate minima unde quaerat
      corporis. Nihil.
    </div> -->
  </div>
</template>
