<script setup>
import edos from './../../capas/ejemplo-edos.json'

const contenidoGloboInformativo = feature => `Estdo: <b>${feature.nom_edo}</b>`
</script>

<template>
  <SisdaiMapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <SisdaiCapaXyz />

    <SisdaiCapaGeojson
      :datos="edos"
      :zIndex="1"
      :globoInformativo="contenidoGloboInformativo"
    />
  </SisdaiMapa>
</template>
