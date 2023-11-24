<template>
  <SisdaiMapa
    class="con-panel-izquierda-vis"
    :vista="{ extension: '-98.6634,18.8368,-97.9408,19.7288' }"
  >
    <SisdaiCapaXyz posicion="1" />

    <SisdaiCapaWms
      id="corrientes"
      :parametros="{ LAYERS: 'agua_corrientes_agua_21_nal_l' }"
      capa="agua_corrientes_agua_21_nal_l"
      nombre="Corrientes de agua 2021"
      posicion="2"
    />

    <SisdaiCapaWms
      id="localidades"
      :parametros="{ LAYERS: 'caaresa_pob_localidades_20_loc_p' }"
      capa="agua_corrientes_agua_21_nal_l"
      nombre="Localidades en la Cuenca del Alto Atoyac y su área de influencia 2020"
      posicion="3"
    />

    <SisdaiCapaWms
      id="centros"
      :parametros="{ LAYERS: 'hcti_centros_invest_conahcyt_0421_xy_p' }"
      nombre="Centros de Investigación del Conahcyt a abril de 2021"
      posicion="4"
    />

    <template #panel-izquierda-vis>
      <SisdaiLeyenda para="corrientes" />
      <SisdaiLeyenda para="localidades" />
      <SisdaiLeyenda para="centros" />
    </template>
  </SisdaiMapa>
</template>
