<template>
  <SisdaiMapa descripcion="Mapa básico con capas base visible a nivel mundial.">
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo capas xyz</p>
    </template>

    <SisdaiCapaXyz fuente="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />

    <SisdaiCapaXyz
      fuente="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
      @alIniciarCargaTesela="() => console.log('C: alIniciarCargaTesela')"
      @alFinalizarCargaTesela="() => console.log('C: alFinalizarCargaTesela')"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="v => console.log('C: alFinalizarCarga', v)"
    />
  </SisdaiMapa>
</template>
