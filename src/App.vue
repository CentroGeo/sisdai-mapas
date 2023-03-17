<script setup>
import Mapa from "@/components/Mapa.vue"
</script>

<template>
  <div class="contenedor-completo">
    <div class="contenedor-mitad mitad-a"><Mapa /></div>
    <div class="contenedor-mitad mitad-b"><Mapa /></div>
  </div>
</template>

<style scoped>
.mitad-a {
  grid-area: a;
  background-color: bisque;
}

.mitad-b {
  grid-area: b;
  background-color: palegoldenrod;
}

.contenedor-completo {
  /*width: 100%;*/
  display: grid;
  grid-template: repeat(2, 1fr);
   grid-template-areas:
    "a b";
  gap: 10px;
}

.contenedor-mitad {
  display: flex;
  justify-content: center;
}


</style>
