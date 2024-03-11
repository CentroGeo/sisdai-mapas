<script setup>
import axios from 'axios'
import { computed, ref, watch } from 'vue'
import { parametrosEnFormatoURL } from './../../../../src/utiles'

const cdnArchivos =
  'https://dev-dadsig-cdn.crip.conahcyt.mx/enis/cultura/pueblosindigenas'
const url_gema_geoserver = 'https://dev-dadsig-gema.crip.conahcyt.mx/geoserver'

// VER DE QUE MANERA PODEMOS TRAER LOS FEATURES DESDE LA CAPA
function urlFeatures(capa, atributos, filtro) {
  const parametros = {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    outputFormat: 'application/json',
    typeName: capa,
    propertyName: atributos,
    cql_filter: filtro,
  }

  return `${url_gema_geoserver}/ows?${parametrosEnFormatoURL(parametros)}`
}
const consultar = (f, e = () => {}) => axios(f).catch(e)
const ordenarBbox = bbox => [bbox[1], bbox[0], bbox[3], bbox[2]]

const extensionInicial = [-118.3651, 14.5321, -86.7104, 32.7187]

const mapaPueblosContexto = ref(null)
const pueblos = ref({})
const puebloSeleccionado = ref('')
const estados = ref([])
const estadoSeleccionado = ref(undefined)
const municipios = ref([])
const municipioSeleccionado = ref(undefined)

function consultarEstados() {
  consultar(
    urlFeatures('gref_division_estatal_20_est_a', 'cve_ent,nom_ent')
  ).then(({ data, status }) => {
    // console.log(status)
    if (status !== 200) return

    estados.value = data.features.map(({ bbox, properties }) => ({
      clave: properties.cve_ent,
      nombre: properties.nom_ent,
      bbox: bbox,
    }))
  })
}
consultarEstados()

function consultarMunicipios(cve_ent) {
  consultar(
    urlFeatures(
      'gref_division_municipal_20_mun_a',
      'cve_mun,nom_mun',
      `cve_ent='${cve_ent.clave}'`
    )
  ).then(({ data, status }) => {
    // console.log(status)
    if (status !== 200) return

    municipios.value = data.features.map(({ bbox, properties }) => ({
      clave: properties.cve_mun,
      nombre: properties.nom_mun,
      bbox: bbox,
    }))
  })
}

function ajustarVista(bbox) {
  mapaPueblosContexto.value.ajustarVista({
    extension: ordenarBbox(bbox),
  })
}

watch(estadoSeleccionado, nv => {
  municipios.value = []
  municipioSeleccionado.value = undefined

  if (nv === undefined) {
    mapaPueblosContexto.value.ajustarVista()
  } else {
    consultarMunicipios(nv)
    ajustarVista(nv.bbox)
  }
})

watch(municipioSeleccionado, nv => {
  if (nv === undefined) {
    if (estadoSeleccionado.value !== undefined)
      ajustarVista(estadoSeleccionado.value.bbox)
  } else {
    ajustarVista(nv.bbox)
  }
})

function reiniciarTodo() {
  estadoSeleccionado.value = undefined
  municipioSeleccionado.value = undefined
}

function alAjustarVista(valor) {
  if (valor === undefined) reiniciarTodo()
}

const filtroEdo = computed(() =>
  estadoSeleccionado.value !== undefined
    ? `cve_ent='${estadoSeleccionado.value.clave}'`
    : undefined
)

const filtroEdoMun = computed(() =>
  municipioSeleccionado.value !== undefined
    ? `cvegeomun='${estadoSeleccionado.value.clave}${municipioSeleccionado.value.clave}'`
    : filtroEdo.value
)

const infoTerritorios = f =>
  `<p class="m-t-0">Territorio del pueblo: <b>${f.pueblo}</b></p><p class="m-b-0">${[
    // `Superficie: <b>${f.}</b>`,
    `Lengua: <b>${f.lengua}</b>`,
    `Fuente del dato: <b>${f.fuente}</b>`,
  ].join('<br />')}</p>`

const infoPueblos = (f, pueblo) =>
  `<p class="m-t-0">Población indígena ${pueblo}</p><p class="m-b-0">${[
    `Pueblo: <b>${f.nombre_pueblo}</b>`,
    `Población: <b>${f.pihogares}</b>`,
    `Estado: <b>${f.nom_ent}</b>`,
    `Municipio: <b>${f.nom_mun}</b>`,
    `Localidad: <b>${f.nom_loc}</b>`,
  ].join('<br />')}</p>`

const infoNucleo = p =>
  `<p class="m-t-0">Núcleo agrario: <b>${p.nom_nucleo}</b></p><p class="m-b-0">${[
    `Población indígena: <b>${p.pi_hogares}</b>`,
    `Tipo: <b>${p.tipo_propie}</b>`,
    `Programa: <b>${p.programa}</b>`,
    // `Municipio: <b>${f.nom_mun}</b>`,
    // `Localidad: <b>${f.nom_loc}</b>`,
  ].join('<br />')}</p>`
</script>

<template>
  <SisdaiMapa
    class="mapa-pueblos-contexto"
    elementosDescriptivos="titulo-mapa-pueblos-contexto"
    :vista="{ extension: extensionInicial }"
    ref="mapaPueblosContexto"
    @alAjustarVista="alAjustarVista"
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
            :value="municipio"
          >
            {{ municipio.nombre }}
          </option>
        </select>
      </div>
    </template>

    <template #panel-izquierda-vis>
      <p class="vis-titulo-leyenda">Pueblos</p>

      <SisdaiLeyenda
        para="pciaf_pob_indigena_asent_hist_20_loc_p"
        v-globo-informacion="
          'Territorio donde históricamente se han asentado los pueblos originarios. (INALI, 2009).'
        "
      />
      <SisdaiLeyenda
        para="pciaf_pob_indigena_residentes_20_loc_p"
        v-globo-informacion="
          'Localidad no identificada como asentamiento histórico del pueblo de referencia según el Catálogo de Lenguas Indígenas Nacionales del INALI.'
        "
      />
      <SisdaiLeyenda
        para="pciaf_territorios_pueb_indig_07_nal_a"
        v-globo-informacion="
          'Aproximación a los territorios de los pueblos indígenas a partir de la propuesta elaborada por Eckart Boege en 2008 e INPI 2021.'
        "
      />
    </template>

    <!-- Capas Base -->
    <SisdaiCapaXyz posicion="1" />

    <SisdaiCapaWms
      capa="gref_division_estatal_20_est_a"
      :filtro="filtroEdo"
      posicion="2"
      :url="`${url_gema_geoserver}/wms`"
    />

    <SisdaiCapaWms
      capa="gref_division_municipal_20_mun_a"
      :filtro="filtroEdoMun"
      posicion="3"
      :url="`${url_gema_geoserver}/wms`"
      :visible="estadoSeleccionado !== undefined"
    />
    <!-- Capas Base -->

    <!-- Capas Pueblos -->
    <SisdaiCapaWms
      capa="pciaf_territorios_pueb_indig_07_nal_a"
      id="pciaf_territorios_pueb_indig_07_nal_a"
      :globoInformativo="infoTerritorios"
      nombre="Territorios"
      posicion="4"
      :url="`${url_gema_geoserver}/wms`"
    />

    <SisdaiCapaWms
      capa="pciaf_pob_indigena_residentes_20_loc_p"
      id="pciaf_pob_indigena_residentes_20_loc_p"
      :filtro="filtroEdoMun"
      :globoInformativo="p => infoPueblos(p, 'residente')"
      nombre="Población indígena residente"
      posicion="5"
      :url="`${url_gema_geoserver}/wms`"
    />

    <SisdaiCapaWms
      capa="pciaf_pob_indigena_asent_hist_20_loc_p"
      id="pciaf_pob_indigena_asent_hist_20_loc_p"
      :filtro="filtroEdoMun"
      :globoInformativo="p => infoPueblos(p, 'en asentamientos históricos')"
      nombre="Población indígena en asentamientos históricos"
      posicion="6"
      :url="`${url_gema_geoserver}/wms`"
    />
    <!-- Capas Pueblos -->

    <!-- Capas Contexto -->

    <SisdaiCapaWms
      capa="pciaf_pob_ind_nucleos_agrarios_21_nal_a"
      id="pciaf_pob_ind_nucleos_agrarios_21_nal_a"
      :filtro="filtroEdoMun"
      :globoInformativo="infoNucleo"
      nombre="Población indígena en asentamientos históricos (selecciona un estado para ver esta capa)"
      posicion="8"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />
    <!-- Capas Contexto -->
    <template #panel-derecha-vis>
      <p class="vis-titulo-leyenda">Contexto</p>

      <!-- <SisdaiLeyenda
        para="p_indigenas_ccpi_28102021"
        v-globo-informacion:izquierda="'jeje'"
      />
      <SisdaiLeyenda para="p_indigenas_ofnas_representa_28102021" />
      <SisdaiLeyenda para="p_indigenas_radiodifusoras_28102021" />
      <SisdaiLeyenda para="p_indigenas_casas_comedores_2021" />
      <SisdaiLeyenda para="salu_hospitales_generales_pub_1122_xy_p" />
      <SisdaiLeyenda para="gref_escuelas_sep_2015" />
      <SisdaiLeyenda para="gref_corredores_red_nac_caminos_21_nal_l" /> -->
      <SisdaiLeyenda para="pciaf_pob_ind_nucleos_agrarios_21_nal_a" />
    </template>
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
