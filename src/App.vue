<script setup>
import SisdaiMapa from '@/componentes/SisdaiMapa.vue'
import SisdaiCapa from '@/componentes/SisdaiCapa.vue'
import SisdaiLeyenda from '@/componentes/SisdaiLeyenda.vue'
</script>

<template>
  <div>
    <SisdaiMapa>
      <SisdaiCapa
        id="capa-1"
        nombre="Capa 1"
      />
      <SisdaiLeyenda para="capa-1" />
    </SisdaiMapa>

    <hr />

    <SisdaiMapa>
      <SisdaiCapa />
      <!-- <SisdaiLeyenda para="capa-2" /> -->
    </SisdaiMapa>
  </div>
</template>

<style></style>
