<script setup>
import { toRefs } from 'vue'
import LeyendaControl from './leyenda/LeyendaControl.vue'

const props = defineProps({
  idCapa: {},

  idMapa: {},

  /**
   * Define si se agrega el control (input) en el titulo de la leyenda. El control se vincula
   * con la visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Reactivo: ✅
   */
  sinControl: {
    type: Boolean,
    default: false,
  },
})
const { sinControl } = toRefs(props)
</script>

<template>
  <div
    ref="sisdaiLeyenda"
    class="sisdai-mapa-leyenda"
  >
    <div class="leyenda-titulo">
      <LeyendaControl :sinControl="sinControl" />
    </div>
  </div>
</template>
