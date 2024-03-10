<script setup>
import { reactive } from 'vue'

const capasEncendidas = reactive({
  estados: true,
  centros: true,
  localidades: true,
  corrientes: true,
})
const filtros = reactive({
  localidades: undefined,
  corrientes: undefined,
})
</script>

<template>
  <div>
    <SisdaiMapa :vista="{ extension: '-98.6634,18.8368,-97.9408,19.7288' }">
      <template #panel-izquierda-vis>
        <SisdaiLeyendaNueva para="division_estatal" />
        <SisdaiLeyendaNueva para="centros" />
        <SisdaiLeyendaNueva para="localidades" />
        <SisdaiLeyendaNueva para="corrientes" />

        <!-- <SisdaiLeyendaExterna
          fuenteCapa="https://gema.conahcyt.mx/geoserver/wms"
          capa="caaresa_pob_localidades_20_loc_p"
          tituloCapa="Leyenda externa de Localidadees"
          :visibilidadCapa="capasEncendidas.localidades"
          @alCambiarVisibilidad="valor => (capasEncendidas.localidades = valor)"
          @alCambiarVisibilidadClases="valor => (filtros.localidades = valor)"
        /> -->

        <!-- <SisdaiLeyendaExterna
        fuenteCapa="https://gema.conahcyt.mx/geoserver/wms"
        capa="hcti_centros_invest_conahcyt_0421_xy_p"
        tituloCapa="Leyenda externa de Centros"
        @alCambiarVisibilidad="valor => (capasEncendidas.centros = valor)"
      />

      <SisdaiLeyendaExterna
        fuenteCapa="https://gema.conahcyt.mx/geoserver/wms"
        capa="gref_division_estatal_20_est_a"
        tituloCapa="Leyenda externa de Estados"
        @alCambiarVisibilidad="valor => (capasEncendidas.estados = valor)"
      /> -->

        <!-- <SisdaiLeyenda
        para="corrientes"
        :sinControlClases="true"
      />
      <SisdaiLeyenda
        para="localidades"
        :sinControlClases="false"
      />
      <SisdaiLeyenda para="centros" />
      <SisdaiLeyenda para="division_estatal" /> -->
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
        :parametros="{
          LAYERS: 'agua_corrientes_agua_21_nal_l',
          cql_filter: filtros.corrientes,
        }"
        capa="agua_corrientes_agua_21_nal_l"
        nombre="Corrientes de agua 2021"
        posicion="3"
        :visible="capasEncendidas.corrientes"
      />

      <SisdaiCapaWms
        id="localidades"
        capa="caaresa_pob_localidades_20_loc_p"
        nombre="Localidades en la Cuenca del Alto Atoyac y su área de influencia 2020"
        posicion="4"
        tituloClases="Número de habitantes"
        :visible="capasEncendidas.localidades"
      />

      <SisdaiCapaWms
        id="centros"
        :parametros="{ LAYERS: 'hcti_centros_invest_conahcyt_0421_xy_p' }"
        nombre="Centros de Investigación del Conahcyt a abril de 2021"
        posicion="5"
        :visible="capasEncendidas.centros"
      />
    </SisdaiMapa>

    <!-- <SisdaiLeyendaExterna
      fuenteCapa="https://gema.conahcyt.mx/geoserver/wms"
      capa="agua_corrientes_agua_21_nal_l"
      tituloCapa="Leyenda externa de Corrientes"
      :visibilidadCapa="capasEncendidas.corrientes"
      @alCambiarVisibilidad="valor => (capasEncendidas.corrientes = valor)"
      @alCambiarVisibilidadClases="valor => (filtros.corrientes = valor)"
    /> -->
  </div>
</template>
