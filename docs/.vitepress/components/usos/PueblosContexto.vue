<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'

const cdnArchivos =
  'https://dev-dadsig-cdn.crip.conahcyt.mx/enis/cultura/pueblosindigenas'
const url_gema_geoserver = 'https://dev-dadsig-gema.crip.conahcyt.mx/geoserver'

const mapaPueblosContexto = ref(null)
const pueblos = ref({})
const puebloSeleccionado = ref('')
const estados = ref([])
const estadoSeleccionado = ref(undefined)
const municipios = ref([])
const municipioSeleccionado = ref(undefined)

// VER DE QUE MANERA PODEMOS TRAER LOS FEATURES DESDE LA CAPA
function urlFeatures(capa, atributos = '', filtro = '') {
  const cql_filter = filtro !== '' ? `&cql_filter=${filtro}` : ''
  return `${url_gema_geoserver}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${capa}&propertyName=${atributos}${cql_filter}&outputFormat=application/json`
}

function consultarEstados() {
  axios(urlFeatures('gref_division_estatal_20_est_a', 'cve_ent,nom_ent'))
    .then(({ data, status }) => {
      // console.log(status)
      if (status !== 200) return
      // bbox

      estados.value = data.features.map(({ bbox, properties }) => ({
        clave: properties.cve_ent,
        nombre: properties.nom_ent,
        bbox: bbox,
      }))
    })
    .catch(() => {})
}
consultarEstados()

function consultarMunicipios(cve_ent) {
  axios(
    urlFeatures(
      'gref_division_municipal_20_mun_a',
      'cve_mun,nom_mun',
      `cve_ent='${cve_ent.clave}'`
    )
  )
    .then(({ data, status }) => {
      // console.log(status)
      if (status !== 200) return
      // bbox
      municipios.value = data.features.map(({ properties }) => ({
        clave: properties.cve_mun,
        nombre: properties.nom_mun,
      }))
    })
    .catch(() => {})
}

watch(estadoSeleccionado, nv => {
  municipios.value = []

  if (nv === undefined) {
    mapaPueblosContexto.value.ajustarVista()
  } else {
    consultarMunicipios(nv)
    mapaPueblosContexto.value.ajustarVista({
      extension: [nv.bbox[1], nv.bbox[0], nv.bbox[3], nv.bbox[2]],
    })
  }
})

function msg(texto) {
  console.log(texto)
}
</script>

<template>
  <SisdaiMapa
    class="mapa-pueblos-contexto"
    elementosDescriptivos="titulo-mapa-pueblos-contexto"
    :vista="{
      extension: [-118.3651, 14.5321, -86.7104, 32.7187],
    }"
    ref="mapaPueblosContexto"
  >
    <template #panel-encabezado-vis>
      <p
        id="titulo-mapa-pueblos-contexto"
        class="vis-titulo-visualizacion"
      >
        Pueblos indígenas y su contexto
      </p>

      <div class="contenedor-selectores grid">
        <input
          class="buscador-comunidad columna-7-esc m-b-0"
          type="text"
          placeholder="Explora por comunidad"
        />

        <select
          class="columna-3-esc m-b-0"
          v-model="puebloSeleccionado"
          :disabled="pueblos.length === 0"
        >
          <option value="">Explora por pueblo</option>
          <option
            v-for="(pueblo, idx) in pueblos"
            :key="idx"
            :value="idx"
          >
            {{ pueblo }}
          </option>
        </select>

        <select
          class="columna-3-esc m-b-0"
          v-model="estadoSeleccionado"
          :disabled="estados.length === 0"
        >
          <option :value="undefined">Explora por estado</option>
          <option
            v-for="estado in estados"
            :key="estado.clave"
            :value="estado"
          >
            {{ estado.nombre }}
          </option>
        </select>

        <select
          class="columna-3-esc m-b-0"
          v-model="municipioSeleccionado"
          :disabled="municipios.length === 0"
        >
          <option :value="undefined">Explora por municipio</option>
          <option
            v-for="municipio in municipios"
            :key="municipio.clave"
            :value="municipio.clave"
          >
            {{ municipio.nombre }}
          </option>
        </select>
      </div>
    </template>

    <template #panel-izquierda-vis>
      <p class="vis-titulo-leyenda">Pueblos</p>

      <!-- <SisdaiLeyenda para="p_indigenas_comunidades_17122021" /> -->
      <!-- <SisdaiLeyenda para="p_indigenas_asent_historicos_2020" />
      <SisdaiLeyenda
        para="p_indigenas_residentes_2020"
        :sinControlClases="false"
      /> -->
      <!-- <SisdaiLeyenda para="p_indigenas_territorios_lenguas_2007" /> -->
    </template>
    <SisdaiCapaXyz posicion="1" />

    <SisdaiCapaWms
      :parametros="{
        LAYERS: 'gref_division_estatal_20_est_a',
        cql_filter:
          estadoSeleccionado !== undefined
            ? `cve_ent='${estadoSeleccionado.clave}'`
            : undefined,
      }"
      posicion="2"
      :url="`${url_gema_geoserver}/wms`"
    />

    <SisdaiCapaWms
      :parametros="{
        LAYERS: 'gref_division_municipal_20_mun_a',
        cql_filter:
          estadoSeleccionado !== undefined
            ? `cve_ent='${estadoSeleccionado.clave}'`
            : undefined,
      }"
      posicion="3"
      :url="`${url_gema_geoserver}/wms`"
      :visible="estadoSeleccionado !== undefined"
    />

    <SisdaiCapaWms
      id="p_indigenas_residentes_2020"
      nombre="Población indígena residente"
      :parametros="{
        LAYERS: 'p_indigenas_residentes_2020',
        // cve_ent,nom_ent,cve_mun,cvegeomun,nom_mun,cve_loc,cvegeoloc,nom_loc,cve_pueblo,nom_pueblo,pih
        cql_filter:
          estadoSeleccionado !== ''
            ? `cve_ent='${estadoSeleccionado}'`
            : undefined,
      }"
      posicion="3"
      :url="`${url_gema_geoserver}/wms`"
    />

    <SisdaiCapaWms
      id="p_indigenas_asent_historicos_2020"
      nombre="Población indígena en asentamientos históricos"
      :parametros="{
        LAYERS: 'p_indigenas_asent_historicos_2020',
        // cve_ent,nom_ent,cve_mun,cvegeomun,nom_mun,cve_loc,cvegeoloc,nom_loc,cve_pueblo,nom_pueblo,pih
        cql_filter:
          estadoSeleccionado !== ''
            ? `cve_ent='${estadoSeleccionado}'`
            : undefined,
      }"
      posicion="4"
      :url="`${url_gema_geoserver}/wms`"
    />
  </SisdaiMapa>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

.sisdai-mapa.mapa-pueblos-contexto {
  .contenedor-selectores {
    column-gap: 16px;
    .buscador-comunidad {
      margin-bottom: 0 !important;
    }
  }

  // .leyenda-clases {
  //   display: flex;
  //   flex-direction: column;
  // }

  .panel-pie-vis {
    text-align: center;
  }

  @include mediaquery('esc') {
    .panel-izquierda-vis,
    .panel-derecha-vis {
      grid-row-end: span 2; // para que el panel izquierdo use dos renglones
    }
    .panel-pie-vis {
      grid-column-start: 2; // para que el pie empiece en la segunda columna
      grid-column-end: span 1 !important; // para que el panel izquierdo use dos renglones
      text-align: end;
    }
  }
}
</style>
