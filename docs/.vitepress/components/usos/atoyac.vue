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
    class="mapa-mortaliada-enfermedad con-panel-encabezado-vis con-panel-izquierda-vis con-panel-pie-vis"
    :vista="{
      // centro: [-98.3404, 19.2824],
      // acercamiento: 8.9,
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
        class="radio-estilo-capa"
        v-for="opcion in opciones"
        :key="opcion.estilo"
      >
        <input
          :id="opcion.estilo"
          type="radio"
          :value="opcion.estilo"
          v-model="seleccion"
        />
        <label :for="opcion.estilo">
          {{ opcion.nombre }}
        </label>
        <SisdaiLeyenda
          v-show="seleccion === opcion.estilo"
          para="mortalidad"
          :sinControl="true"
        />
        <span v-show="seleccion === opcion.estilo">
          Media nacional: {{ opcion.media }}
        </span>
      </div>

      <SisdaiLeyenda para="contaminacion" />
      <SisdaiLeyenda para="categoria" />
      <SisdaiLeyenda para="cuenca" />
      <SisdaiLeyenda para="estados" />
    </template>

    <SisdaiCapaXyz posicion="0" />

    <SisdaiCapaWms
      id="mortalidad"
      :parametros="{
        LAYERS: 'caaresa_mortalidad_erc_10_19_reg_a',
        STYLES: seleccion,
      }"
      posicion="1"
    />

    <SisdaiCapaWms
      id="contaminacion"
      nombre="Nivel de contaminación por posibles nefrotóxicos"
      :parametros="{
        LAYERS: 'caaresa_nivel_contaminacion_04_21_reg_a',
        STYLES: 'caaresa_nivel_contaminacion_04_21_reg_a_estilo_c',
      }"
      posicion="2"
    />

    <SisdaiCapaWms
      id="categoria"
      nombre="Categoría de clúster de acuerdo con la correlación entre la tasa de mortalidad por ERC en personas de 15 a 49 años (2010-2019) y el indicador de contaminación por posibles nefrotóxicos (2004-2021)"
      :parametros="{
        LAYERS: 'caaresa_corr_cont_mortalidad_00_21_reg_a',
        STYLES: 'caaresa_corr_cont_mortalidad_00_21_reg_a_estilo_d',
      }"
      posicion="3"
    />

    <SisdaiCapaWms
      id="estados"
      nombre="División estatal 2020"
      :parametros="{ LAYERS: 'gref_division_estatal_20_est_a' }"
      posicion="4"
    />

    <SisdaiCapaWms
      id="cuenca"
      nombre="Cuenca del Alto Atoyac y su área de influencia 2021"
      :parametros="{ LAYERS: 'caaresa_cuenca_alto_atoyac_21_reg_a' }"
      posicion="5"
    />

    <template #panel-pie-vis>
      <a
        class="boton boton-primario boton-chico m-t-2"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        Descargar datos
        <span class="icono-archivo-descargar" />
      </a>
    </template>
  </SisdaiMapa>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

.mapa-mortaliada-enfermedad {
  .radio-estilo-capa .control-capa {
    display: none;
  }
  &.sisdai-mapa {
    @include mediaquery('esc') {
      // // max-height: calc(var(--alto-maximo-contenedor-vis) + 60px);
      // max-height: var(--alto-maximo-contenedor-vis);
      grid-template-rows: auto 1fr auto !important;

      .panel-izquierda-vis {
        grid-row-end: span 2; // para que el panel izquierdo use dos renglones
      }
      .panel-pie-vis {
        grid-column-start: 2; // para que el pie empiece en la segunda columna
        grid-column-end: span 1;
        text-align: end; // ajustar contenido a la derecha
      }
    }
  }
}

.vis-titulo-visualizacion.subtitulo {
  font-size: 1.25rem;
}
</style>
