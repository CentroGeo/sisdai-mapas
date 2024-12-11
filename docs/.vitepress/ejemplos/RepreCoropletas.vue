<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa vectorial con representación de coropletas."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">
        Ejemplo una capa vectorial con representación de coropletas
      </p>
    </template>

    <SisdaiCapaVectorial
      fuente="/assets/estados-poligonos.geojson"
      :estilo="{
        contorno: 'gris',
        categorias: {
          atributo: 'grado_marg',
          estilo: {
            'Muy alto': {
              relleno: 'rgb(198, 51, 42)',
            },
            Alto: {
              relleno: 'rgb(241, 176, 110)',
            },
            Medio: {
              relleno: 'rgb(255, 240, 60)',
            },
            Bajo: {
              relleno: 'rgb(177, 215, 120)',
            },
            'Muy bajo': {
              relleno: 'rgb(72, 146, 75)',
            },
          },
          // orden: [],
        },
      }"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="v => console.log('C: alFinalizarCarga', v)"
    />
  </SisdaiMapa>
</template>
