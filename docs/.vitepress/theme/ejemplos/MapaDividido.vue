<script setup>
import { valores } from '@centrogeomx/sisdai-mapas'
import { ref } from 'vue'

const dividir = ref(undefined)
// gref_unidades_climaticas_98_nal_a, gref_unidades_climaticas_08_nal_a
</script>

<template>
  <SisdaiMapa
    :vista="{ extension: valores.extensiones.nacional }"
    :dividir="Number(dividir)"
  >
    <template #panel-encabezado-vis>
      <button @click="() => (dividir = dividir === undefined ? 50 : undefined)">
        Dividir
      </button>
    </template>

    <SisdaiCapaXyz :posicion="0" />
    <SisdaiCapaWms
      capa="gref_unidades_climaticas_98_nal_a"
      lado="izquierda"
      :posicion="1"
    />
    <SisdaiCapaVectorial
      :estilo="{ contorno: 'gris', relleno: 'transparente' }"
      fuente="/assets/estados-poligonos.geojson"
      lado="derecha"
      :posicion="2"
    />
  </SisdaiMapa>
</template>
