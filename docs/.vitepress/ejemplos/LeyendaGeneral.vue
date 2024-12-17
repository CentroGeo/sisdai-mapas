<script setup></script>

<template>
  <SisdaiMapa
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
    descripcion="Este mapa es un ejemplo simple de como configurar el mapa para ajustarlo conforme a las necesidades de cada proyecto."
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo del uso de leyendas</p>
    </template>

    <template #panel-izquierda-vis>
      <!-- xyz -->
      <SisdaiLeyenda para="xyz" />

      <!-- vectorial -->
      <SisdaiLeyenda para="wms" />

      <!-- wms -->
      <SisdaiLeyenda para="vectorial" />
    </template>

    <SisdaiCapaXyz
      id="xyz"
      titulo="Capa Base"
      posicion="0"
    />

    <SisdaiCapaWms
      capa="hcti_snii_sexo_22_est_a"
      id="wms"
      titulo="Sistema Nacional de Investigadoras e Investigadores por sexo y entidad 2022"
      posicion="1"
    />

    <SisdaiCapaVectorial
      id="vectorial"
      fuente="/assets/estados-centroides.geojson"
      titulo="Centroides de Estados"
      posicion="2"
    />
  </SisdaiMapa>
</template>
