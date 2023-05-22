<script setup>
import SisdaiCapa from '@/componentes/SisdaiCapa.vue'
import SisdaiLeyenda from '@/componentes/SisdaiLeyenda.vue'
import SisdaiMapa from '@/componentes/SisdaiMapa.vue'
import { ref } from 'vue'

const nombreCapa1 = ref('Capa 1')
</script>

<template>
  <div>
    <input
      type="text"
      v-model="nombreCapa1"
    />

    <hr />

    <SisdaiMapa>
      <SisdaiCapa
        id="capa-1"
        :nombre="nombreCapa1"
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
