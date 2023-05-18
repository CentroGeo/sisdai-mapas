<script setup>
defineProps({
  para: {
    type: String,
    require: true,
  },
})
</script>

<template>
  <h2>Hola, soy una leyenda 😇 para: {{ para }}</h2>
</template>
