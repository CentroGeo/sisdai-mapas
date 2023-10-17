<script setup>
import { ref, watch } from 'vue'

const opciones = [
  {
    estilo: 'hcti_snii_sexo_22_est_a_total',
    nombre: 'Tasa de mortalidad en personas de todos los rangos de edad',
  },
  {
    estilo: 'hcti_snii_sexo_22_est_a_investigadoras',
    nombre: 'Tasa de mortalidad en personas de 15 a 49 años',
  },
  {
    estilo: 'hcti_snii_sexo_22_est_a_investigadores',
    nombre: 'Tasa de mortalidad en hombres de 15 a 49 años',
  },
]

const variable = ref('hcti_snii_sexo_22_est_a_total')

watch(variable, nv => {
  console.log('variable', nv)
})
</script>

<template>
  <SisdaiMapa
    class="sin-cargador con-panel-encabezado-vis con-panel-izquierda-vis"
    :vista="{
      zoom: 10,
      centro: [-98.3022, 19.2828],
    }"
  >
    <SisdaiCapaXyz posicion="1" />

    <SisdaiCapaWms
      url="http://dev-dadsig-gema.crip.conacyt.mx/geoserver/wms"
      id="mortalidad"
      nombre="Tasa de mortalidad en personas de todos los rangos de edad"
      :parametros="{
        LAYERS: 'caaresa_mortalidad_erc_10_19_reg_a',
        // STYLES: variable,
      }"
      posicion="2"
    />

    <SisdaiCapaWms
      id="estados"
      :parametros="{ LAYERS: 'gref_division_estatal_20_est_a' }"
      posicion="3"
    />

    <template #panel-izquierda-vis>
      <div>
        <!-- <span v-for="(opcion, i) in opciones">
          <input
            :id="`radio_mortalida_${i}`"
            type="radio"
            :value="opcion.estilo"
            v-model="variable"
          />
          <label :for="`radio_mortalida_${i}`">
            {{ opcion.nombre }}
          </label>
        </span> -->

        <SisdaiLeyenda para="mortalidad" />
      </div>
    </template>
  </SisdaiMapa>
</template>
