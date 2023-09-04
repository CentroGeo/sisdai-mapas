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
