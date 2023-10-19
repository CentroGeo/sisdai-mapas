<script setup>
import { ref } from 'vue'

const opciones = [
  {
    estilo: 'caaresa_mortalidad_erc_10_19_reg_a_t_erc',
    nombre: 'Tasa de mortalidad en personas de todos los rangos de edad',
    media: 7.1,
  },
  {
    estilo: 'caaresa_mortalidad_erc_10_19_reg_a_t_erc1549',
    nombre: 'Tasa de mortalidad en personas de 15 a 49 años',
    media: 2.831,
  },
  {
    estilo: 'caaresa_mortalidad_erc_10_19_reg_a_t_erc1549h',
    nombre: 'Tasa de mortalidad en hombres de 15 a 49 años',
    media: 3.466,
  },
]

const seleccion = ref(opciones[0].estilo)
</script>

<template>
  <SisdaiMapa
    class="mapa-mortaliada-enfermedad con-panel-encabezado-vis con-panel-izquierda-vis"
    :vista="{
      // centro: [-98.3404, 19.2824],
      // zoom: 8.9,
      extension: '-98.6634,18.8368,-97.9408,19.7288',
    }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion m-t-0">
        Mortalidad por enfermedad renal crónica del 2010 al 2019
      </p>

      <p class="vis-titulo-visualizacion subtitulo m-b-2">
        (Defunciones por cada cien mil habitantes)
      </p>
    </template>

    <template #panel-izquierda-vis>
      <div
        v-for="opcion in opciones"
        :key="opcion.estilo"
      >
        <input
          :id="opcion.estilo"
          type="radio"
          :value="opcion.estilo"
          v-model="seleccion"
        />
        <label
          class="etiqueta-radio"
          :for="opcion.estilo"
        >
          {{ opcion.nombre }}
          <SisdaiLeyenda
            v-show="seleccion === opcion.estilo"
            para="mortalidad"
            :sinControl="true"
          />
          <span v-show="seleccion === opcion.estilo">
            Media nacional: {{ opcion.media }}
          </span>
        </label>
      </div>

      <SisdaiLeyenda para="cuenca" />
      <SisdaiLeyenda para="estados" />
    </template>

    <SisdaiCapaXyz posicion="0" />

    <SisdaiCapaWms
      id="estados"
      nombre="División estatal 2020"
      :parametros="{ LAYERS: 'gref_division_estatal_20_est_a' }"
      posicion="1"
      url="http://dev-dadsig-gema.crip.conacyt.mx/geoserver/wms"
    />

    <SisdaiCapaWms
      id="mortalidad"
      :parametros="{
        LAYERS: 'caaresa_mortalidad_erc_10_19_reg_a',
        STYLES: seleccion,
      }"
      posicion="2"
      url="http://dev-dadsig-gema.crip.conacyt.mx/geoserver/wms"
    />

    <SisdaiCapaWms
      id="cuenca"
      nombre="Cuenca del Alto Atoyac y su área de influencia 2021"
      :parametros="{ LAYERS: 'caaresa_cuenca_alto_atoyac_21_reg_a' }"
      posicion="3"
      url="http://dev-dadsig-gema.crip.conacyt.mx/geoserver/wms"
    />
  </SisdaiMapa>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

.mapa-mortaliada-enfermedad {
  &.sisdai-mapa.contenedor-vis {
    @include mediaquery('esc') {
      max-height: calc(var(--alto-maximo-contenedor-vis) + 60px);
      grid-template-rows: auto 1fr auto;

      .panel-izquierda-vis {
        grid-row-end: span 2;
        // overflow: hidden;
      }
      .panel-pie-vis {
        grid-column-start: 2;
      }
    }
  }

  .etiqueta-radio {
    display: flex;
    flex-direction: column;

    .sisdai-mapa-leyenda > .sin-control .nombre-variable {
      display: none;
    }
  }
}

.vis-titulo-visualizacion.subtitulo {
  font-size: 1.25rem;
}
</style>
