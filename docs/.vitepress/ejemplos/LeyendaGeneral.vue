<script setup></script>

<template>
  <SisdaiMapa
    descripcion="Este mapa es un ejemplo simple de como configurar el mapa para ajustarlo conforme a las necesidades de cada proyecto."
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo del uso de leyendas</p>
    </template>

    <template #panel-izquierda-vis>
      <!-- xyz -->
      <SisdaiLeyenda para="xyz" />

      <!-- vectorial -->
      <!-- <SisdaiLeyenda /> -->

      <!-- wms -->
      <!-- <SisdaiLeyenda /> -->
    </template>

    <SisdaiCapaXyz
      id="xyz"
      nombre="Capa Base"
    />
  </SisdaiMapa>
</template>
