<script setup>
import { valores } from '@centrogeomx/sisdai-mapas'
import { lados } from '@centrogeomx/sisdai-mapas/src/utiles/capa'
import { ref } from 'vue'

const dividir = ref(50)
// gref_unidades_climaticas_98_nal_a, gref_unidades_climaticas_08_nal_a
</script>

<template>
  <SisdaiMapa
    :vista="{ extension: valores.extensiones.nacional }"
    :dividir="Number(dividir)"
  >
    <SisdaiCapaXyz :posicion="0" />
    <SisdaiCapaWms
      capa="gref_unidades_climaticas_98_nal_a"
      :lado="lados.izquierdo"
      :posicion="1"
      :mosaicos="true"
    />
    <SisdaiCapaVectorial
      :estilo="{ contorno: 'gris', relleno: 'transparente' }"
      fuente="/assets/estados-poligonos.geojson"
      :lado="lados.derecho"
      :posicion="2"
    />

    <template #panel-pie-vis>
      <button
        class="boton-primario boton-chico"
        @click="() => (dividir = dividir === undefined ? 50 : undefined)"
      >
        {{ dividir === undefined ? 'Activar' : 'Desactivar' }} mapa dividido
      </button>
    </template>
  </SisdaiMapa>
</template>
