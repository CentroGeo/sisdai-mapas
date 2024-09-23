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
    />

    <template #panel-pie-vis>
      <SisdaiLeyenda para="cap_wms" />
    </template>
  </SisdaiMapa>

  <!-- 
    <SisdaiCapaWms
      url="https://dadsigvisgeo.conahcyt.mx/geoserver/wms"
      capa="vacunacion:background_limites_210521"
      estilos="[{
        nombre: 'estilo-geoserver'
        titulo: 'Lo que representa (Ejemplo: Número de personas)',
      },{
        nombre: 'estilo-geoserver'
        titulo: 'Lo que representa (Ejemplo: Número de hectáreas)',
      }]"
    />
    -->
</template>
