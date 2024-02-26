<script setup>
import { reactive } from 'vue'

const capasEncendidas = reactive({
  estados: true,
  centros: true,
})
</script>

<template>
  <SisdaiMapa :vista="{ extension: '-98.6634,18.8368,-97.9408,19.7288' }">
    <template #panel-izquierda-vis>
      <SisdaiLeyendaExterna
        fuenteCapa="https://gema.conahcyt.mx/geoserver/wms"
        capa=""
        estiloCapa=""
        filtroCapa=""
        tituloCapa="Leyenda externa de Centros"
        urlCapa="https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=hcti_centros_invest_conahcyt_0421_xy_p&STYLE="
        @alCambiarVisibilidad="valor => (capasEncendidas.centros = valor)"
      />

      <SisdaiLeyendaExterna
        tituloCapa="Leyenda externa de Estados"
        urlCapa="https://gema.conahcyt.mx/geoserver/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=gref_division_estatal_20_est_a&STYLE="
        @alCambiarVisibilidad="valor => (capasEncendidas.estados = valor)"
      />

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

    <SisdaiCapaXyz posicion="1" />

    <SisdaiCapaWms
      id="division_estatal"
      :parametros="{ LAYERS: 'gref_division_estatal_20_est_a' }"
      capa="gref_division_estatal_20_est_a"
      nombre="Division Estatal"
      posicion="2"
      :visible="capasEncendidas.estados"
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
      :visible="capasEncendidas.centros"
    />
  </SisdaiMapa>
</template>
