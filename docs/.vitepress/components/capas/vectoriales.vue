<script setup>
function esURL(str) {
  try {
    new URL(str)
    return true
  } catch (error) {
    return false
  }
}

function cuadrojardines(f) {
  return `<p class="m-t-0 m-b--6"><b>${f.nom_jardin}</b><br />${
    esURL(f.www)
      ? `<a class="m-t-1" href="${f.www}" target="_blank" rel="noopener noreferrer">${f.www}</a>`
      : `<i class="m-t-1">${f.www}</i>`
  }</p>`
}
</script>

<template>
  <SisdaiMapa
    class="mapa-jardines"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
    elementosDescriptivos="titulo-mapa"
  >
    <template #panel-izquierda-vis>
      <p
        class="vis-titulo-visualizacion"
        id="titulo-mapa"
      >
        Red de Jardines Etnobiológicos Conahcyt
      </p>
      <p class="vis-leyenda">
        Ubicación de los jardines etnobiológicos, etnobotánicos y botánicos de
        México apoyados por Consejo Nacional de Humanidades, Ciencias y
        Tecnologías (Conahcyt).
      </p>

      <SisdaiMapaInstruccionalNavegacionTeclado />

      <SisdaiLeyenda
        para="entidades"
        sinControl
      />
      <SisdaiLeyenda
        para="jardines"
        sinControl
      />
    </template>

    <SisdaiCapaXyz :posicion="1" />

    <SisdaiCapaVectorial
      id="entidades"
      nombre="Entidades"
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
      :cuadroInformativo="cuadrojardines"
    />
    <!-- :cuadroInformativo2="{ contenido: cuadroInformativo, abreCon: 'hover' }" -->

    <SisdaiCapaVectorial
      id="topojson"
      :posicion="4"
      :renderizarComoImagen="true"
      fuente="/assets/belgium.json"
      formato="topojson"
      :globoInformativo="f => f.name_nl"
    />

    <template #panel-pie-vis>
      <p class="vis-fuente m-0">
        Fuente: Datos de origen del Consejo Nacional de Humanidades, Ciencias y
        Tecnologías (Conahcyt), con corte al 21 de septiembre de 2023.
      </p>
      <a
        href="#"
        class="boton boton-primario boton-chico m-t-2-mov"
      >
        Descargar datos <span class="icono-archivo-descargar" />
        <span class="a11y-solo-lectura">
          Archivo descargable en formato: zip, peso: 30 kB
        </span>
      </a>
    </template>
  </SisdaiMapa>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

.sisdai-mapa.mapa-jardines {
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

  .panel-pie-vis {
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }

  @include mediaquery('esc') {
    // max-height: none !important;
    // grid-template-rows: auto 450px minmax(auto, 85px) !important; // los paneles en medio del encabezado y pie no se desborden
    // grid-template-rows: 0 1fr auto !important; // los paneles en medio del encabezado y pie no se desborden

    .panel-izquierda-vis {
      grid-row-end: span 2 !important; // para que el panel izquierdo use dos renglones
    }
    .panel-pie-vis {
      grid-column-start: 2 !important; // para que el pie empiece en la segunda columna
      flex-direction: row;
      gap: 16px;
      overflow: hidden;

      a.boton {
        white-space: nowrap;
        height: fit-content;
      }
    }
  }
}
</style>
