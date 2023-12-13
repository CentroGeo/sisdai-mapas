<!--This file is part of sisdai-mapas.-->

<!--sisdai-mapas is free software: you can redistribute it and/or modify-->
<!--it under the terms of the GNU Lesser General Public License as published by the-->
<!--Free Software Foundation, either version 3 of the License, or-->
<!--(at your option) any later version.-->

<!--sisdai-mapas is distributed in the hope that it will be useful,-->
<!--but WITHOUT ANY WARRANTY; without even the implied warranty of-->
<!--MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General-->
<!--Public License for more details.-->

<!--You should have received a copy of the GNU Lesser General Public License along-->
<!--with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.-->

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
