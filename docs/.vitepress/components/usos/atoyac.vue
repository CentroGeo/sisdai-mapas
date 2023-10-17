<script setup>
import { ref } from 'vue'

const opciones = [
  {
    estilo: 'caaresa_mortalidad_erc_10_19_reg_a_t_erc',
    nombre: 'Tasa de mortalidad en personas de todos los rangos de edad',
  },
  {
    estilo: 'caaresa_mortalidad_erc_10_19_reg_a_t_erc1549',
    nombre: 'Tasa de mortalidad en personas de 15 a 49 años',
  },
  {
    estilo: 'caaresa_mortalidad_erc_10_19_reg_a_t_erc1549h',
    nombre: 'Tasa de mortalidad en hombres de 15 a 49 años',
  },
]

const seleccion = ref(opciones[0])
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
      :parametros="{
        LAYERS: 'caaresa_mortalidad_erc_10_19_reg_a',
        STYLES: seleccion.estilo,
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
        <span v-for="(opcion, i) in opciones">
          <input
            :id="`radio_mortalidad_${i}`"
            type="radio"
            :value="opcion"
            v-model="seleccion"
          />
          <label
            class="etiqueta-radio"
            :for="`radio_mortalidad_${i}`"
          >
            {{ opcion.nombre }}

            <SisdaiLeyenda
              v-show="seleccion.estilo === opcion.estilo"
              para="mortalidad"
              :sinControl="true"
            />
          </label>
        </span>
      </div>
    </template>
  </SisdaiMapa>
</template>

<style lang="scss">
.etiqueta-radio {
  display: flex;
  flex-direction: column;

  .sisdai-mapa-leyenda > .nombre-variable {
    display: none;
  }

  .sisdai-mapa-leyenda > .sin-control .nombre-variable {
    display: none;
  }
}
</style>
