<script setup>
import { ref } from 'vue'
import edos from './../../capas/ejemplo-edos.json'

const propiedadesEstilo = ['relleno', 'contorno', 'radio']
const propiedadEstilo = ref('relleno')
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
        tipo: 'categorias',
        columna: 'grado_marg',
        propiedadEstilo: propiedadEstilo,
        colores: colores,
        ordenCategorias: ['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'],
        etiquetasPersonalizadas: [],
      }"
    />

    <sisdai-mapa-encabezado>
      Interacón de clasificación: <br />
      <div class="horizontal">
        Propiedad estilo:
        <select v-model="propiedadEstilo">
          <option
            v-for="(valor, idx) in propiedadesEstilo"
            :key="`propiedad_estilo_${idx}`"
            :value="valor"
          >
            {{ valor }}
          </option>
        </select>
      </div>

      <!--<div class="horizontal">
        Colores:
        <span
          v-for="(color, idx) in ['green', 'greenyellow', 'yellow', 'orange', 'red']"
          :key="`check-color-${idx}`"
        >
          <input
            type="checkbox"
            :id="`check-color-${idx}`"
            :value="color"
            v-model="colores"
          />
          <label :for="`check-color-${idx}`">{{ color }}</label>
        </span>
      </div>-->

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
