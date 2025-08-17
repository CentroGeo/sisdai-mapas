<script setup>
import { extensiones } from '@centrogeomx/sisdai-mapas/valores'
import { ref } from 'vue'

const deslizar = ref(undefined)
// gref_unidades_climaticas_98_nal_a, gref_unidades_climaticas_08_nal_a
</script>

<template>
  <SisdaiMapa
    :vista="{ extension: extensiones.nacional }"
    :dividir="deslizar"
  >
    <template #panel-encabezado-vis>
      <button
        @click="() => (deslizar = deslizar === undefined ? 50 : undefined)"
      >
        Deslizar
      </button>
    </template>

    <SisdaiCapaXyz
      :lado="undefined"
      :posicion="0"
    />
    <SisdaiCapaWms
      capa="gref_unidades_climaticas_98_nal_a"
      :lado="undefined"
      :posicion="1"
    />
    <SisdaiCapaVectorial
      :estilo="{ contorno: 'gray', relleno: 'transparente' }"
      fuente="/assets/estados-poligonos.geojson"
      :posicion="2"
    />
  </SisdaiMapa>
</template>
