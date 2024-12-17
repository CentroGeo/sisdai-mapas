<script setup>
function globo(params) {
  // console.log('globo', params)
  return `
    <p>Entidad: <b>${params['nom_ent']}</b></p>
    <p>Investigadoras: <b>${params['investigadoras']}</b></p>
  `
}
</script>

<template>
  <SisdaiMapa
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187'
    }"
    descripcion="Prueba de mapa con una capa wms"
  >
    <template #panel-encabezado-vis>
      <p id="titulo-mapa" class="vis-titulo-visualizacion">Ejemplo simple de una capa wms</p>
    </template>

    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaWms
      capa="hcti_snii_sexo_22_est_a"
      estilo="hcti_snii_sexo_22_est_a_investigadoras"
      id="cap_wms"
      nombre="Sistema Nacional de Investigadoras e Investigadores por sexo y entidad 2022 (Número de mujeres con membresía vigente)"
      url="https://gema.conahcyt.mx/geoserver/wms"
      :globoInformativo="globo"
    />

    <template #panel-pie-vis>
      <SisdaiLeyenda para="cap_wms" />
    </template>
  </SisdaiMapa>
</template>
