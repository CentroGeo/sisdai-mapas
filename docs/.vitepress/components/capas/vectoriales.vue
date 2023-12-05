<script setup>
function cuadroInformativo(f) {
  return `<p class="m-y-0">
            Entidad: <b>${f.nom_edo}</b>
            <br /> 
            <a 
              class="hipervinculo"
              href="https://codigo.conahcyt.mx/sisdai/sisdai-mapas" 
              target="_blank" 
              rel="noopener noreferrer">https://codigo.conahcyt.mx/sisdai/sisdai-mapas</a>
          </p>`
}

function jardines(f) {
  return `<p class="m-t-0 m-b--6"><b>${f.nom_jardin}</b><br />
    <a class="m-t-1" href="${f.www}" target="_blank" rel="noopener noreferrer">${f.www}</a>
    </p>`
}
</script>

<template>
  <SisdaiMapa
    class="sin-cargador con-panel-encabezado-vis con-panel-pie-vis"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="m-t-0">Ejemplo del uso de capa vectorial.</p>
      </div>
    </template>

    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaVectorial
      id="idVectorial"
      nombre="Capa vectorial"
      :posicion="2"
      :renderizarComoImagen="true"
      :visible="true"
      fuente="/assets/estados-poligonos.geojson"
      :estilo="{
        'contorno-color': 'gris',
        'relleno-color': 'transparente',
      }"
      :globoInformativo="f => `Entidad: <b>${f.nom_edo}</b>`"
    />

    <SisdaiCapaVectorial
      id="jardines"
      nombre="Red de Jardines Etnobiológicos Conahcyt, con corte al 21 de septiembre 2023"
      :posicion="3"
      fuente="https://gema.conahcyt.mx/geoserver/humanidades_ciencias/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=humanidades_ciencias%3Ahcti_jardines_etnobiologicos_210923_xy_p&outputFormat=application%2Fjson"
      geometria="punto"
      :estilo="{
        'circulo-contorno-color': '#232323',
        'circulo-relleno-color': '#58ADA8',
      }"
      :cuadroInformativo="jardines"
      :cuadroInformativo2="{ contenido: cuadroInformativo, abreCon: 'hover' }"
    />

    <template #panel-pie-vis>
      <SisdaiLeyenda para="idVectorial" />
      <SisdaiLeyenda para="jardines" />
    </template>
  </SisdaiMapa>
</template>

<style lang="scss">
.cuerpo-globo-info a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // width: 100%;
  width: auto;
  max-width: 100%;
}

.m-b--6 {
  margin-bottom: -6px;
}
</style>
