<template>
  <SisdaiLeyendaWms
    informacion="Capa del Capitulo Búsqueda de alternativas al glifosato"
    nombre="glifo_rendimiento_ha_4_cultivos_20_est_p"
    :estilo="estilo"
    titulo="Rendimiento de los cultivos de maíz de temporal y de riego, aguacate y naranja por centroide de entidad 2020"
    @alCambiarVisibilidad="v => console.log('Leyenda: alCambiarVisibilidad', v)"
    @alIniciarCargaSimbologia="
      () => console.log('Leyenda: alIniciarCargaSimbologia')
    "
    @alFinalizarCargaSimbologia="
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
      v-for="(titulo, nombre) in estilos"
      :value="nombre"
      :key="nombre"
    >
      {{ titulo }}
    </option>
  </SisdaiSelector>
</template>

<script setup>
import { ref } from 'vue'
const estilo = ref(undefined)

const estilos = {
  glifo_rendimiento_ha_4_cultivos_20_est_p_aguacate:
    'Aguacate (toneladas/hectáreas',
  glifo_rendimiento_ha_4_cultivos_20_est_p_maiz_r:
    'Maíz de riego (toneladas/hectáreas',
  glifo_rendimiento_ha_4_cultivos_20_est_p_maiz_t:
    'Maíz de temporal (toneladas/hectáreas',
  glifo_rendimiento_ha_4_cultivos_20_est_p_naranja:
    'Naranja (toneladas/hectáreas)',
}
</script>
