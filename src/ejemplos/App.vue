<script setup>
import SisdaiCapa from '@/componentes/SisdaiCapa.vue'
import SisdaiCapaWms from '@/componentes/SisdaiCapaWms.vue'
import SisdaiCapaXyz from '@/componentes/SisdaiCapaXyz.vue'
import SisdaiLeyenda from '@/componentes/SisdaiLeyenda.vue'
import SisdaiMapa from '@/componentes/SisdaiMapa.vue'
import { ref } from 'vue'

const capasMapa = ref([])

function print(mgs) {
  console.log(mgs)
}
</script>

<template>
  <div>
    <ol>
      <li
        v-for="(capa, idx) in [
          'contexto:gref_division_estatal_2020',
          'contexto:gref_division_municipal_2020',
          'contexto:gref_inst_educacion_sup_05_06_07_2021',
          'contexto:gref_uneme_capa_ssa_2702202',
        ]"
        :key="`check-${idx}`"
      >
        <input
          type="checkbox"
          :id="`check-${idx}`"
          :value="capa"
          v-model="capasMapa"
        />
        <label :for="`check-${idx}`">{{ capa }}</label>
      </li>
    </ol>

    <SisdaiMapa
      class="con-panel-encabezado-vis"
      :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
    >
      <div class="panel-encabezado-vis p-1">
        <SisdaiCapa
          id="capa-1"
          nombre="capasMapa"
        />
        <SisdaiLeyenda para="capa-1" />
      </div>

      <SisdaiCapaWms
        v-for="capa in capasMapa"
        :key="`capa-${capa}`"
        :id="capa"
        :nombre="capa"
        :parametros="{
          LAYERS: capa,
        }"
        @alIniciarCarga="() => print(`${capa} cargando...`)"
        @alFinalizarCarga="
          estado => print(`${capa} ${estado ? 'cargada' : 'error'}`)
        "
      />

      <div class="panel-pie-vis p-1">
        <SisdaiLeyenda
          v-for="capa in capasMapa"
          :key="`leyenda-${capa}`"
          :para="capa"
        />
      </div>
    </SisdaiMapa>

    <br />

    <SisdaiMapa :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }">
      <SisdaiCapaXyz />
    </SisdaiMapa>
  </div>
</template>

<style></style>
