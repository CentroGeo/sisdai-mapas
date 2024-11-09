<!-- SisdaiLeyendaWms -->

<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa wms."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo una capa wms</p>

      <SisdaiLeyendaWms informacion="informnación de la leyenda" :sinControl="true" :sinControlClases="true" titulo="Capa wms" />
    </template>

    <SisdaiCapaWms
      capa="hcti_snii_sexo_22_est_a"
      :estilo="estilo"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="(v) => console.log('C: alFinalizarCarga', v)"
    />

    <template #panel-pie-vis>
      <select v-model="estilo">
        <option :value="undefined">Estilo por defecto</option>
        <option value="hcti_snii_sexo_22_est_a_investigadoras">
          Número de mujeres con membresía vigente
        </option>
        <option value="hcti_snii_sexo_22_est_a_investigadores">
          Número de hombres con membresía vigente
        </option>
      </select>
    </template>
  </SisdaiMapa>
</template>

<script setup>
import { ref } from 'vue'
const estilo = ref(undefined)
</script>
