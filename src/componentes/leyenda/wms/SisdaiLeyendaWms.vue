<script setup>
import SisdaiLeyendaControl from './../control'
import _props from './props'

const { informacion } = defineProps(_props)

const clases = [1, 2]
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <div class="leyenda-titulo">
      <SisdaiLeyendaControl
        etiqueta="pruebas"
        :informacion="informacion"
      />
    </div>

    <div
      v-if="clases.length > 1"
      class="leyenda-clases casillas-subseleccion"
    >
      <ul class="casillas-anidadas">
        <li
          v-for="(clase, idx) in clases"
          :key="`${'capa'}-clase-control-${idx}`"
        >
          <!-- {{ clase }} -->
          <SisdaiLeyendaControl :etiqueta="clase" />
        </li>
      </ul>
    </div>
  </div>
</template>
