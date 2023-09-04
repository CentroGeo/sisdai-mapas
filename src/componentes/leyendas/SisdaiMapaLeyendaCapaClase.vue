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

  /**
   *
   */
  etiqueta: {
    type: String,
    required: true,
  },
})

const { estiloClase, etiqueta } = toRefs(propsSetup)

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

// eslint-disable-next-line
const emit = defineEmits(['alternar-visibilidad'])
</script>

<template>
  <div
    class="sisdai-mapa-leyenda-capa-clase"
    @click="emit('alternar-visibilidad')"
  >
    <span class="sisdai-mapa-leyenda-capa-clase-color" />
    <span class="sisdai-mapa-leyenda-capa-clase-etiqueta"> {{ etiqueta }}</span>
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa-leyenda-capa-clase {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-color {
    margin-right: 5px;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: v-bind('estiloClaseCss.background.color');
    border-width: v-bind('estiloClaseCss.border.width');
    border-style: v-bind('estiloClaseCss.border.style');
    border-color: v-bind('estiloClaseCss.border.color');
  }

  &-etiqueta {
    text-align: center;
  }
}
</style>
