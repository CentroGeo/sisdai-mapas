<template>
  <SisdaiMapa descripcion="Mapa básico con una capa wms visible.">
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo una capas wms</p>
    </template>

    <SisdaiCapaWms
      @alIniciarCargaTesela="() => console.log('C: alIniciarCargaTesela')"
      @alFinalizarCargaTesela="() => console.log('C: alFinalizarCargaTesela')"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="(v) => console.log('C: alFinalizarCarga', v)"
    />
  </SisdaiMapa>
</template>
