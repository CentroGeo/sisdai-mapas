<script setup>
const infoAsentamientos = f =>
  `<p class="m-t-0">Población indígena en asentamientos históricos</p><p class="m-b-0">${[
    `Pueblo: <b>${f.nombre_pueblo}</b>`,
    `Población: <b>${f.pihogares}</b>`,
    `Estado: <b>${f.nom_ent}</b>`,
    `Municipio: <b>${f.nom_mun}</b>`,
    `Localidad: <b>${f.nom_loc}</b>`,
  ].join('<br />')}</p>`
</script>

<template>
  <SisdaiMapa
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <!-- <SisdaiCapaXyz :posicion="1" /> -->

    <SisdaiCapaWms
      posicion="1"
      :parametros="{
        LAYERS: 'hcti_snii_sexo_22_est_a',
      }"
    />

    <SisdaiCapaWms
      url="https://dev-dadsig-gema.crip.conahcyt.mx/geoserver/wms"
      posicion="2"
      :parametros="{
        LAYERS: 'pciaf_pob_indigena_asent_hist_20_loc_p',
      }"
    />

    <SisdaiUtfGrid
      capa="pciaf_pob_indigena_asent_hist_20_loc_p"
      fuente="https://dev-dadsig-gema.crip.conahcyt.mx/geoserver/wms"
      :globoInformativo="infoAsentamientos"
      posicion="2"
    />
    <SisdaiUtfGrid
      capa="hcti_snii_sexo_22_est_a"
      :globoInformativo="f => `Entidad: <b>${f.nom_ent}</b>`"
      posicion="1"
    />
  </SisdaiMapa>
</template>
