<template>
  <SisdaiMapa :vista="{ extension: '-98.6634,18.8368,-97.9408,19.7288' }">
    <SisdaiCapaXyz posicion="1" />

    <SisdaiCapaWms
      id="division_estatal"
      :parametros="{ LAYERS: 'gref_division_estatal_20_est_a' }"
      capa="gref_division_estatal_20_est_a"
      nombre="Division Estatal"
      posicion="2"
    />

    <SisdaiCapaWms
      id="corrientes"
      :parametros="{ LAYERS: 'agua_corrientes_agua_21_nal_l' }"
      capa="agua_corrientes_agua_21_nal_l"
      nombre="Corrientes de agua 2021"
      posicion="3"
    />

    <SisdaiCapaWms
      id="localidades"
      :parametros="{ LAYERS: 'caaresa_pob_localidades_20_loc_p' }"
      capa="agua_corrientes_agua_21_nal_l"
      nombre="Localidades en la Cuenca del Alto Atoyac y su área de influencia 2020"
      posicion="4"
      tituloClases="Número de habitantes"
    />

    <SisdaiCapaWms
      id="centros"
      :parametros="{ LAYERS: 'hcti_centros_invest_conahcyt_0421_xy_p' }"
      nombre="Centros de Investigación del Conahcyt a abril de 2021"
      posicion="5"
    />

    <template #panel-izquierda-vis>
      <SisdaiLeyenda
        para="corrientes"
        :sinControlClases="true"
      />
      <SisdaiLeyenda
        para="localidades"
        :sinControlClases="false"
      />
      <SisdaiLeyenda para="centros" />
      <SisdaiLeyenda para="division_estatal" />
    </template>
  </SisdaiMapa>
</template>
