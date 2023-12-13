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
import { computed, toRefs } from 'vue'

// eslint-disable-next-line
const propsSetup = defineProps({
  /**
   *
   */
  estiloClase: {
    type: Object,
    required: true,
  },
})

const { estiloClase } = toRefs(propsSetup)

const estiloACss = estilo => ({
  background: {
    color: estilo.relleno?.color ? estilo.relleno.color : 'none',
  },
  border: {
    width: `${estilo.contorno?.grosor ? estilo.contorno.grosor : 0}px`,
    style: estilo.contorno?.color ? 'solid' : 'none',
    color: estilo.contorno?.color ? estilo.contorno.color : 'none',
  },
})
const estiloClaseCss = computed(() => estiloACss(estiloClase.value))
</script>

<template>
  <span class="sisdai-mapa-leyenda-capa-color" />
</template>

<style lang="scss" scoped>
.sisdai-mapa-leyenda-capa-color {
  margin-right: 5px;
  width: 16px;
  height: 16px;
  background-color: v-bind('estiloClaseCss.background.color');
  border-width: v-bind('estiloClaseCss.border.width');
  border-style: v-bind('estiloClaseCss.border.style');
  border-color: v-bind('estiloClaseCss.border.color');
}
</style>
