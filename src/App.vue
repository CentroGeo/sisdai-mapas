<script setup>
import SisdaiCapa from '@/componentes/SisdaiCapa.vue'
import SisdaiCapaWms from '@/componentes/SisdaiCapaWms.vue'
import SisdaiLeyenda from '@/componentes/SisdaiLeyenda.vue'
import SisdaiMapa from '@/componentes/SisdaiMapa.vue'
import { ref } from 'vue'

const capas = [
  'pueblosindigenas:asentamientos_historicos',
  'pueblosindigenas:casas_comedores',
  'pueblosindigenas:centros_coordinadores',
  'pueblosindigenas:estados_hist_resi',
  'pueblosindigenas:indigenas_residentes',
  'pueblosindigenas:municipios_hist_resi',
  'pueblosindigenas:nucleos_agrarios',
  'pueblosindigenas:oficinas_representacion',
  'pueblosindigenas:radiodifusoras_inpi',
  'pueblosindigenas:territorios_pueblos_indigenas',
]

const capasMapa = ref([])
</script>

<template>
  <div>
    <span
      v-for="(capa, idx) in capas"
      :key="`check-${idx}`"
    >
      <input
        type="checkbox"
        :id="`check-${idx}`"
        :value="capa"
        v-model="capasMapa"
      />
      <label :for="`check-${idx}`">{{ capa }}</label>
    </span>

    <hr />

    <SisdaiMapa>
      <SisdaiCapa
        id="capa-1"
        :nombre="capasMapa"
      />
      <SisdaiCapaWms
        v-for="(capa, idx) in capasMapa"
        :key="`capaMapa-${idx}`"
        :parametros="{
          LAYERS: capa,
        }"
      />
      <SisdaiLeyenda para="capa-1" />
    </SisdaiMapa>

    <hr />

    <SisdaiMapa>
      <!-- <SisdaiCapa /> -->
      <!-- <SisdaiLeyenda para="capa-2" /> -->
    </SisdaiMapa>
  </div>
</template>

<style></style>
