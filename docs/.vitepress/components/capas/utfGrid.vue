<template>
  <SisdaiMapa
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <!-- <SisdaiCapaXyz :posicion="1" /> -->

    <SisdaiCapaWms
      :posicion="1"
      :parametros="{
        LAYERS: 'hcti_snii_sexo_22_est_a',
      }"
    />
    <SisdaiCapaWms
      :posicion="2"
      :parametros="{
        LAYERS: 'hcti_snii_sexo_22_est_a',
      }"
    />

    <sisdaiUtfGrid capa="hcti_snii_sexo_22_est_a" />
  </SisdaiMapa>
</template>
