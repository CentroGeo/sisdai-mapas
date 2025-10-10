<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa vectorial con representación de puntos agrupados."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">
        Ejemplo una capa vectorial con representación de puntos agrupados
      </p>
    </template>

    <SisdaiCapaXyz />

    <SisdaiCapaVectorial
      fuente="/assets/estados-centroides.geojson"
      :estilo="{
        'circle-radius': 5,
        'circle-fill-color': '#58ADA8',
        'circle-stroke-color': '#232323',
        'circle-stroke-width': 0.5,
      }"
      :representacion="{
        'puntos-agrupados': { distancia: 40, distanciaMinima: 40 },
      }"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="v => console.log('C: alFinalizarCarga', v)"
    />
  </SisdaiMapa>
</template>
