<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa vectorial con estilo de símbolos graduados."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">
        Ejemplo una capa vectorial con estilo de símbolos graduados
      </p>
    </template>

    <SisdaiCapaXyz />

    <SisdaiCapaVectorial
      fuente="/assets/estados-centroides.geojson"
      :estilo="{
        'circulo-contorno-color': 'gray',
        categorias: {
          atributo: 'grado_marg',
          estilo: {
            'Muy alto': { 'circulo-radio': 25 },
            Alto: { 'circulo-radio': 20 },
            Medio: { 'circulo-radio': 15 },
            Bajo: { 'circulo-radio': 10 },
            'Muy bajo': { 'circulo-radio': 5 },
          },
          // orden: [],
        },
      }"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="v => console.log('C: alFinalizarCarga', v)"
    />
  </SisdaiMapa>
</template>
