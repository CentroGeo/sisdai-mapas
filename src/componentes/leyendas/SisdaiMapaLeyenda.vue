<script setup>
import { onMounted, ref, toRefs, watch } from 'vue'
import SisdaiMapaLeyendaCapaControl from './SisdaiMapaLeyendaCapaControl.vue'

// eslint-disable-next-line
const propsSetup = defineProps({
  /**
   * `para`
   * - Tipo: `String` o `Array`
   * - Obligatorio: ✅
   * - Interactivo: ✅
   *
   * Identificador de la capa a la que se quiere vincular el control de leyenda.
   */
  para: {
    type: [String, Array],
    required: true,
  },

  /**
   * `titulo`
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Interactivo: ✅
   *
   * Titulo que tendrá la leyenda por encima de los controles de las capas con las que se vincule.
   */
  titulo: {
    type: String,
    default: undefined,
  },
})

const { titulo, para } = toRefs(propsSetup)

const idsCapas = ref([])
function actualizarIdsCapas() {
  if (Array.isArray(para.value)) {
    idsCapas.value = para.value
  } else if (typeof para.value === typeof '') {
    idsCapas.value = para.value.split(',')
  }
}
watch(para, actualizarIdsCapas)

onMounted(() => {
  actualizarIdsCapas()
})
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <div
      class="titulo"
      v-show="titulo !== undefined"
    >
      {{ titulo }}
    </div>
    <div class="sisdai-mapa-leyenda-contenido">
      <SisdaiMapaLeyendaCapaControl
        v-for="idx in idsCapas"
        :key="`sisdai_mapa_control_${idx}`"
        :para="idx"
      />
    </div>
  </div>
</template>

<style lang="scss">
.sisdai-mapa-leyenda {
  &-contenido {
    display: flex;
    flex-direction: column;
  }

  .titulo {
    font-size: 20px;
  }
}
</style>
