<script setup>
import { ref } from 'vue'

const nombre = ref('Capa vectorial')
function tooltipContenido(f) {
  return `<p class="m-y-0">
            Entidad: <b>${f.nom_edo}</b>
            <br /> 
            <a 
              style="color: #fff;"
              href="https://codigo.conahcyt.mx/sisdai/sisdai-mapas" 
              target="_blank" 
              rel="noopener noreferrer">https://codigo.conahcyt.mx/sisdai/sisdai-mapas</a>
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
      :nombre="nombre"
      :posicion="2"
      :renderizarComoImagen="true"
      :visible="true"
      fuente="/assets/estados-poligonos.geojson"
      :cuadroInformativo="tooltipContenido"
    />
    <!-- :cuadroInformativo="f => `Entidad: <b>${f.nom_edo}</b> <a href="#" target="_blank" rel="noopener noreferrer">Enlace</a>`" -->
    <!-- :globoInformativo="f => `Entidad: <b>${f.nom_edo}</b>`" -->
    <!-- :fuente="estados" -->
    <!-- fuente="https://cultura.conacyt.mx/pueblosindigenas-registro-api/media/capa_comunidades_indigenas/comunidades_localidad.geojson" -->

    <template #panel-pie-vis>
      <SisdaiLeyenda para="idVectorial" />
    </template>
  </SisdaiMapa>
</template>
