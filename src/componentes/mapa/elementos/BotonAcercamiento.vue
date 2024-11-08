<script setup>
defineProps({
  nombre: {},
  pictograma: {},
})
</script>

<template>
  <button
    :aria-label="nombre"
    class="sisdai-mapa-control-boton boton-pictograma boton-primario"
    role="button"
    type="button"
    v-globo-informacion:izquierda="nombre"
  >
    <span
      :class="`pictograma-${pictograma}`"
      aria-hidden="true"
    />
  </button>
</template>
