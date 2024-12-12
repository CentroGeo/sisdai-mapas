<template>
  <SisdaiMapa
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <template #panel-encabezado-vis>
      <h4 class="vis-titulo-visualizacion m-b-0">
        Mapa con funcionalidades de accesibilidad
      </h4>
      <div id="lista-teclado"></div>
    </template>

    <SisdaiCapaXyz />
  </SisdaiMapa>
</template>
