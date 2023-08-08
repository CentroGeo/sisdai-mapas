<script setup>
import { ref } from 'vue'

const nombre = ref('Capa vectorial')
</script>

<template>
  <SisdaiMapa class="sin-cargador con-panel-encabezado-vis con-panel-pie-vis">
    <template #panel-encabezado-vis>
      <div>
        <input
          type="text"
          v-model="nombre"
        />
      </div>
    </template>

    <SisdaiCapaXyz />

    <SisdaiCapaVectorial
      id="idVectorial"
      :nombre="nombre"
    />

    <template #panel-pie-vis>
      <div>
        <SisdaiLeyenda para="idVectorial" />
      </div>
    </template>
  </SisdaiMapa>
</template>
