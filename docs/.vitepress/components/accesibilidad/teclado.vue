<template>
  <SisdaiMapa
    class="sin-cargador con-panel-encabezado-vis"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
      extensionMargen: 0,
    }"
  >
    <template #panel-encabezado-vis>
      <div id="lista-teclado"></div>
    </template>

    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaVectorial
      :posicion="3"
      fuente="/assets/estados-centroides.geojson"
      :globoInformativo="f => `Entidad: <b>${f.nom_edo}</b>`"
      accesibilidadTecladoNombre="nom_edo"
      :visible="true"
    />

    <SisdaiCapaVectorial
      :posicion="2"
      fuente="/assets/estados-poligonos.geojson"
      :globoInformativo="f => `ENTIDAD: <b>${f.nom_edo}</b>`"
      :visible="false"
    />
  </SisdaiMapa>
</template>
