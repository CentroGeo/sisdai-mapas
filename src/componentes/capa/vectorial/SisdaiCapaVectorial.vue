<script setup>
import { inject, onMounted } from 'vue'

const mapa = inject('mapa')

onMounted(() => {
  console.log(mapa)
})
</script>

<template>
  <div>sisdai-capa-vectorial</div>
</template>
