<template>
  <SisdaiLeyendaVectorial
    informacion="Capa del Capitulo Búsqueda de alternativas al glifosato"
    :estilo="estilos[estilo]"
    titulo="name"
    @alCambiarVisibilidad="v => console.log('Leyenda: alCambiarVisibilidad', v)"
    @alIniciarCargaSimbologia="
      () => console.log('Leyenda: alIniciarCargaSimbologia')
    "
    @@alFinalizarCargaSimbologia="
      v => console.log('Leyenda: alFinalizarCargaSimbologia', v)
    "
  />

  <SisdaiSelector
    etiqueta="Estilo de capa de la leyenda"
    v-model="estilo"
    class="m-t-3"
    texto_ayuda="Al no haber selección se mostrará el estilo por defecto, en este caso es 'Maíz de riego (toneladas/hectáreas)'"
  >
    <option
      v-for="titulo in Object.keys(estilos)"
      :value="titulo"
      :key="titulo"
    >
      {{ titulo }}
    </option>
  </SisdaiSelector>
</template>

<script setup>
import { ref } from 'vue'

const estilo = ref('poligono')
</script>

<script>
const estilos = {
  punto: {},
  // pictograma: {},
  // forma: {},
  linea: {},
  poligono: {
    contorno: 'gris',
    relleno: 'transparente',
  },
  coropleta: {
    contorno: 'gris',
    categorias: {
      atributo: 'grado_marg',
      estilo: {
        'Muy alto': { relleno: 'rgb(198, 51, 42)' },
        Alto: { relleno: 'rgb(241, 176, 110)' },
        Medio: { relleno: 'rgb(255, 240, 60)' },
        Bajo: { relleno: 'rgb(177, 215, 120)' },
        'Muy bajo': { relleno: 'rgb(72, 146, 75)' },
      },
      // orden: [],
    },
  },
}
</script>
