<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa vectorial."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
    @alIniciarCarga="() => console.log('M: alIniciarCarga')"
    @alFinalizarCarga="(v) => console.log('M: alFinalizarCarga', v)"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo una capa vectorial</p>
    </template>

    <SisdaiCapaVectorial
      fuente="https://gema.conahcyt.mx/geoserver/humanidades_ciencias/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=humanidades_ciencias%3Ahcti_jardines_etnobiologicos_210923_xy_p&outputFormat=application%2Fjson"
      :estilo="{
        'circle-radius': 5,
        'circle-fill-color': '#58ADA8',
        'circle-stroke-color': '#232323',
        'circle-stroke-width': 0.5
      }"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="(v) => console.log('C: alFinalizarCarga', v)"
    />
  </SisdaiMapa>
</template>
