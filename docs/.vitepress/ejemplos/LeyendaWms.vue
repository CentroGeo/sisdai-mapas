<template>
  <SisdaiLeyendaWms
    informacion="informnación de la leyenda"
    nombre="hcti_snii_sexo_22_est_a"
    :estilo="estilo"
    titulo="Capa wms"
    @alCambiarVisibilidad="v => console.log('Leyenda: alCambiarVisibilidad', v)"
    @alIniciarCargaSimbologia="() => console.log('Leyenda: alIniciarCargaSimbologia')"
    @@alFinalizarCargaSimbologia="v => console.log('Leyenda: alFinalizarCargaSimbologia', v)"
  />
  <hr>
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

<script setup>
import { ref } from 'vue'
const estilo = ref(undefined)
</script>
