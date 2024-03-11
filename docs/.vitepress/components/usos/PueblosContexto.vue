<script setup>
import axios from 'axios'
import { computed, ref, watch } from 'vue'
import { parametrosEnFormatoURL } from './../../../../src/utiles'

const cdnArchivos =
  'https://dev-dadsig-cdn.crip.conahcyt.mx/enis/cultura/pueblosindigenas'
const urlApi =
  'https://dev-dadsig-cultura.crip.conahcyt.mx/pueblosindigenas-registro-api/'
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

const filtroEdo2 = computed(() =>
  estadoSeleccionado.value !== undefined
    ? `cve_entidad='${estadoSeleccionado.value.clave}'`
    : undefined
)
const filtroEdoMun2 = computed(() =>
  municipioSeleccionado.value !== undefined
    ? `${filtroEdo2.value} AND cve_municipio='${estadoSeleccionado.value.clave}'`
    : filtroEdo2.value
)

const infoTerritorios = p =>
  `<p class="m-t-0">Territorio del pueblo: <b>${p.pueblo}</b></p><p class="m-b-0">${[
    // `Superficie: <b>${p.}</b>`,
    `Lengua: <b>${p.lengua}</b>`,
    `Fuente del dato: <b>${p.fuente}</b>`,
  ].join('<br />')}</p>`

const infoPueblos = (p, pueblo) =>
  `<p class="m-t-0">Población indígena ${pueblo}</p><p class="m-b-0">${[
    `Pueblo: <b>${p.nombre_pueblo}</b>`,
    `Población: <b>${p.pihogares}</b>`,
    `Estado: <b>${p.nom_ent}</b>`,
    `Municipio: <b>${p.nom_mun}</b>`,
    `Localidad: <b>${p.nom_loc}</b>`,
  ].join('<br />')}</p>`

const infoNucleo = p =>
  `<p class="m-t-0">Núcleo agrario: <b>${p.nom_nucleo}</b></p><p class="m-b-0">${[
    `Población indígena: <b>${p.pi_hogares}</b>`,
    `Tipo: <b>${p.tipo_propie}</b>`,
    `Programa: <b>${p.programa}</b>`,
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
      :filtro="filtroEdoMun2"
      :globoInformativo="infoNucleo"
      nombre="Población indígena en asentamientos históricos (selecciona un estado para ver esta capa)"
      posicion="8"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />

    <SisdaiCapaWms
      capa="gref_corredores_red_nac_caminos_21_nal_l"
      id="gref_corredores_red_nac_caminos_21_nal_l"
      nombre="Red Nacional de Caminos"
      posicion="9"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />

    <SisdaiCapaWms
      capa="educ_establecimientos_escolares_15_xy_p"
      id="educ_establecimientos_escolares_15_xy_p"
      :filtro="filtroEdoMun"
      nombre="Establecimientos escolares"
      posicion="10"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />

    <!-- - Hospitales -->
    <SisdaiCapaWms
      capa="salu_unidades_medicas_1n_clues_21_xy_p"
      id="salu_unidades_medicas_1n_clues_21_xy_p"
      :filtro="filtroEdoMun2"
      nombre="Primer nivel"
      posicion="11"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />
    <SisdaiCapaWms
      capa="salu_unidades_medicas_2n_clues_21_xy_p"
      id="salu_unidades_medicas_2n_clues_21_xy_p"
      :filtro="filtroEdoMun"
      nombre="Segundo nivel"
      posicion="12"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />
    <SisdaiCapaWms
      capa="salu_unidades_medicas_3n_clues_21_xy_p"
      id="salu_unidades_medicas_3n_clues_21_xy_p"
      :filtro="filtroEdoMun"
      nombre="Tercer nivel"
      posicion="13"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />
    <!-- - Hospitalas -->

    <SisdaiCapaWms
      capa="pciaf_casas_comedores_ninez_ind_21_xy_p"
      id="pciaf_casas_comedores_ninez_ind_21_xy_p"
      :filtro="filtroEdoMun"
      nombre="Casas y Comedores del PAEI"
      posicion="14"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />
    <SisdaiCapaWms
      capa="pciaf_radiodifusoras_ind_160124_xy_p"
      id="pciaf_radiodifusoras_ind_160124_xy_p"
      :filtro="filtroEdoMun"
      nombre="Radiodifusoras del INPI"
      posicion="15"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />
    <SisdaiCapaWms
      capa="pciaf_oficinas_repre_inpi_160124_xy_p"
      id="pciaf_oficinas_repre_inpi_160124_xy_p"
      :filtro="filtroEdoMun"
      nombre="Oficinas de representación"
      posicion="16"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />
    <SisdaiCapaWms
      capa="pciaf_centros_coord_pue_ind_160124_xy_p"
      id="pciaf_centros_coord_pue_ind_160124_xy_p"
      :filtro="filtroEdoMun"
      nombre="Centros Coordinadores de Pueblos Indígenas"
      posicion="17"
      :url="`${url_gema_geoserver}/wms`"
      :visible="false"
    />
    <!-- Capas Contexto -->
    <template #panel-derecha-vis>
      <p class="vis-titulo-leyenda">Contexto</p>

      <SisdaiLeyenda para="pciaf_centros_coord_pue_ind_160124_xy_p" />
      <SisdaiLeyenda para="pciaf_oficinas_repre_inpi_160124_xy_p" />
      <SisdaiLeyenda para="pciaf_radiodifusoras_ind_160124_xy_p" />
      <SisdaiLeyenda
        para="pciaf_casas_comedores_ninez_ind_21_xy_p"
        v-globo-informacion:izquierda="
          'Programa de Apoyo a la Educación Indígena'
        "
      />

      <p>Hospitales</p>
      <SisdaiLeyenda
        para="salu_unidades_medicas_1n_clues_21_xy_p"
        v-globo-informacion:izquierda="
          'Forma la estructura básica de la atención médica ambulatoria en el Sistema de Salud, se prestan servicios de prevención de enfermedades (educación y vigilancia epidemológica), saneamiento básico y protección.' +
          '<b>La capa fue estructurada con base en la metodología ETEC; las ubicaciones originales de las unidades se mantienen por lo que es posible que existan errores en la localización.</b>'
        "
      />
      <SisdaiLeyenda
        para="salu_unidades_medicas_2n_clues_21_xy_p"
        v-globo-informacion:izquierda="
          'Generalmente se proporciona consulta externa y/o hospitalización en las 4 necesidades básicas de la medicina (cirugía general, medicina interna, gineco-obstetricia y pediatría)' +
          '<b>La capa fue estructurada con base en la metodología ETEC, se detectaron inconsistencias sobre las ubicaciones por lo que fueron revisadas y corregidas.</b>'
        "
      />
      <SisdaiLeyenda
        para="salu_unidades_medicas_3n_clues_21_xy_p"
        v-globo-informacion:izquierda="
          'Son las unidades médicas con mayor capacidad resolutiva del sistema de salud, el personal es especializado y los procedimientos realizados son de alta complejidad.' +
          '<b>La capa fue estructurada con base en la metodología ETEC, se detectaron inconsistencias sobre las ubicaciones por lo que fueron revisadas y corregidas.</b>'
        "
      />
      <SisdaiLeyenda
        para="educ_establecimientos_escolares_15_xy_p"
        v-globo-informacion:izquierda="
          'Para ver más información sobre estos puntos selecciónalos a nivel estatal (se desplegará el nombre del establecimiento escolar y su Clave de Centro de Trabajo).'
        "
      />
      <SisdaiLeyenda para="gref_corredores_red_nac_caminos_21_nal_l" />
      <SisdaiLeyenda para="pciaf_pob_ind_nucleos_agrarios_21_nal_a" />
    </template>

    <template #panel-pie-vis>
      <a
        :href="`${urlApi}media/capa_comunidades_indigenas/capas_pueblos_indigenas.zip`"
        class="boton boton-primario boton-chico"
        target="_blank"
        rel="noopener noreferrer"
        download="capas_pueblos_indigenas.zip"
      >
        Descargar datos
        <span class="icono-archivo-descargar" />
      </a>
    </template>
  </SisdaiMapa>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

.sisdai-mapa.mapa-pueblos-contexto {
  .contenedor-selectores select {
    text-overflow: ellipsis;
  }
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
