<script setup>
import { ref } from 'vue'
import { personalidada } from '../../../../src/composables/casificacion/categorias'
import edos from './../../capas/ejemplo-edos.json'

const clasificaciones = [
  'cuantiles',
  'linear',
  'cortes-naturales',
  'personalidada',
]
const tipoClasificacion = ref('cuantiles')
const colores = ref(['green', 'greenyellow', 'yellow', 'orange', 'red'])
</script>

<template>
  <sisdai-mapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <sisdai-capa-geojson
      id="clasificada"
      nombre="Capa clasificada"
      :datos="edos"
      :zIndex="1"
      :clasificacion="{
        tipo: tipoClasificacion,
        columna: 'pob18ymas',
        propiedadEstilo: 'relleno',
        colores: colores,
        clasificacionPersonalizada: [
          [540672, 1706000],
          [1706000, 2923000],
          [2923000, 4579000],
          [4579000, 6027000],
          [6027000, 12083969],
        ],
      }"
    />

    <sisdai-mapa-encabezado>
      Interacón de clasificación: <br />
      <div class="horizontal">
        Propiedad estilo:
        <select v-model="tipoClasificacion">
          <option
            v-for="(valor, idx) in clasificaciones"
            :key="`yipo_clasificacion_${idx}`"
            :value="valor"
          >
            {{ valor }}
          </option>
        </select>
      </div>

      <hr />
      <sisdai-mapa-leyenda para="clasificada" />
    </sisdai-mapa-encabezado>

    <sisdai-capa-xyz :zIndex="0" />
  </sisdai-mapa>
</template>

<style lang="scss" scoped>
.horizontal {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  align-items: center;

  > input,
  > select {
    margin: 10px 0;
  }
}
.vertical {
  display: flex;
  flex-direction: column;
}
button:not(:last-child) {
  margin-right: 0;
}
</style>
