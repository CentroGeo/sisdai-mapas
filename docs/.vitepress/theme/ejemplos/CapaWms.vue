<script setup>
import { ref } from 'vue'

const estilo = ref(undefined)

const diccionario = [
  { atributo: 'investigadoras', etiqueta: 'Investigadoras' },
  { atributo: 'nom_ent', etiqueta: 'Entidad' },
]

async function cuadroAsincrono(url) {
  const r = await fetch(url)
  const data = await r.json()
  const propiedades = data.features[0].properties

  const lista = diccionario.map(
    ({ atributo, etiqueta }) =>
      `<li class="m-0">${etiqueta}: ${propiedades[atributo]}</li>`
  )

  return `<p style="margin-bottom: 8px;">Propiedades</p> <ol style="margin-top: 8px">${lista.join('')}</ol>`
}
</script>

<template>
  <SisdaiMapa
    descripcion="Mapa básico con una capa wms."
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo una capa wms</p>
    </template>

    <SisdaiCapaWms
      capa="hcti_snii_sexo_22_est_a"
      :cuadroInformativo="cuadroAsincrono"
      :estilo="estilo"
      posicion="0"
      propiedades="investigadoras,nom_ent"
      @alIniciarCarga="() => console.log('C: alIniciarCarga')"
      @alFinalizarCarga="v => console.log('C: alFinalizarCarga', v)"
    />

    <template #panel-pie-vis>
      <select v-model="estilo">
        <option :value="undefined">Estilo por defecto</option>
        <option value="hcti_snii_sexo_22_est_a_investigadoras">
          Número de mujeres con membresía vigente
        </option>
        <option value="hcti_snii_sexo_22_est_a_investigadores">
          Número de hombres con membresía vigente
        </option>
      </select>
    </template>
  </SisdaiMapa>
</template>
