<script setup></script>

<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa base visible a nivel mundial."
    @alIniciarCarga="() => console.log('M: alIniciarCarga')"
    @alFinalizarCarga="(v) => console.log('M: alFinalizarCarga', v)"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo una capas xyz</p>
    </template>

    <SisdaiCapaXyz url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />

    <SisdaiCapaXyz
      url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
      @alIniciarCargaTesela="() => console.log('C: alIniciarCargaTesela')"
      @alFinalizarCargaTesela="() => console.log('C: alFinalizarCargaTesela')"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="(v) => console.log('C: alFinalizarCarga', v)"
    />
  </SisdaiMapa>
</template>
