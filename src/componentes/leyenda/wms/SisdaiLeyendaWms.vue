<script setup>
import SisdaiLeyendaControl from './../control'

const clases = [1, 2]
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <div class="leyenda-titulo">
      <SisdaiLeyendaControl etiqueta="pruebas" />
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
