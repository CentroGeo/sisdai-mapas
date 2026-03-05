<script setup>
import { ref } from 'vue'

const checkedNames = ref([])
</script>

<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa de servicio de Arcgis."
    :vista="{ extension: '-101.4,10.3,0,70.7', extensionMargen: '10,70,10,10' }"
  >
    <template #panel-encabezado-vis>
      <div>Checked names: {{ checkedNames }}</div>

      <input
        type="checkbox"
        id="jack"
        value="Jack"
        v-model="checkedNames"
      />
      <label for="jack">Jack</label>

      <input
        type="checkbox"
        id="john"
        value="John"
        v-model="checkedNames"
      />
      <label for="john">John</label>
    </template>
    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaArcgis
      fuente="https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer"
      capa="0"
      :mosaicos="false"
      :posicion="2"
    />

    <SisdaiCapaArcgis
      fuente="https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer"
      capa="1"
      :mosaicos="false"
      :posicion="3"
    />
  </SisdaiMapa>
</template>
