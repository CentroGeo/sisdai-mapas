<script setup>
defineProps({
  nombre: {},
  pictograma: {}
})
</script>

<template>
  <button
    class="sisdai-mapa-control-boton boton-pictograma boton-primario"
    type="button"
    role="button"
    :aria-label="nombre"
  >
    <span :class="`pictograma-${pictograma}`" aria-hidden="true" />
  </button>
</template>
