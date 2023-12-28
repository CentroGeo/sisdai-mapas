<template>
  <SisdaiMapa
    class="sin-cargador con-panel-encabezado-vis"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
      extensionMargen: 0,
    }"
    :navegacionTeclado="true"
  >
    <template #panel-encabezado-vis>
      <h4 class="vis-titulo-visualizacion">
        Mapa con funcionalidades de accesibilidad
      </h4>
      <div id="lista-teclado"></div>
    </template>

    <template #panel-izquierda-vis>
      <SisdaiMapaInstruccionalNavegacionTeclado />
    </template>

    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaVectorial
      :posicion="3"
      fuente="/assets/estados-centroides.geojson"
      :globoInformativo="f => `Entidad: <b>${f.nom_edo}</b>`"
      nombreAccesiblePorElemento="nom_edo"
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
