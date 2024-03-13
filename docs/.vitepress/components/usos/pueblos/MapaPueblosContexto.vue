<script setup>
import { computed, ref, watch } from 'vue'
import BuscadorComunidades from './BuscadorComunidades.vue'
import {
  consultar,
  extensionInicial,
  infoNucleo,
  infoPueblos,
  infoTerritorios,
  ordenarBbox,
  urlFeatures,
  urls,
} from './utiles'

const mapaPueblosContexto = ref(null)
const buscadorComunidades = ref(null)
const pueblos = ref({})
const puebloSeleccionado = ref('')
const estados = ref([])
const estadoSeleccionado = ref(undefined)
const municipios = ref([])
const municipioSeleccionado = ref(undefined)

function consultarDatosPueblos() {
  consultar(`${urls.cdn}/mapas/diccionarioPueblos.json`, ({ data }) => {
    pueblos.value = Object.entries(data)
      .map(i => ({ clave: i[0], nom_com: i[1] }))
      .sort((a, b) => {
        return a.nom_com < b.nom_com ? -1 : a.nom_com > b.nom_com ? 1 : 0
      })
    // console.log(pueblos.value)
  })
}
consultarDatosPueblos()

function consultarEstados() {
  consultar(
    urlFeatures({
      typeName: 'gref_division_estatal_20_est_a',
      propertyName: 'cve_ent,nom_ent',
    }),
    ({ data, status }) => {
      // console.log(status)
      if (status !== 200) return

      estados.value = data.features.map(({ bbox, properties }) => ({
        clave: properties.cve_ent,
        nombre: properties.nom_ent,
        bbox: bbox,
      }))
    }
  )
}
consultarEstados()

function consultarMunicipios(cve_ent) {
  consultar(
    urlFeatures({
      typeName: 'gref_division_municipal_20_mun_a',
      propertyName: 'cve_mun,nom_mun',
      cql_filter: `cve_ent='${cve_ent.clave}'`,
    }),
    ({ data, status }) => {
      // console.log(status)
      if (status !== 200) return

      municipios.value = data.features.map(({ bbox, properties }) => ({
        clave: properties.cve_mun,
        nombre: properties.nom_mun,
        bbox: bbox,
      }))
    }
  )
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
  puebloSeleccionado.value = ''
  buscadorComunidades.value.busqueda = ''
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
const filtroPueblosEdoMun = computed(() => {
  if (puebloSeleccionado.value !== '') {
    if (filtroEdoMun.value !== undefined && puebloSeleccionado.value !== '') {
      return `${filtroEdoMun.value} AND clave_pueblo='${puebloSeleccionado.value}'`
    }
    return `clave_pueblo='${puebloSeleccionado.value}'`
  }
  return filtroEdoMun.value
})

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

const visibilidadHospitales = ref([false, false, false])
</script>

<template>
  <SisdaiMapa
    class="mapa-pueblos-contexto"
    elementosDescriptivos="titulo-mapa-pueblos-contexto"
    :vista="{ extension: extensionInicial }"
    ref="mapaPueblosContexto"
    @clickAjustarVista="reiniciarTodo"
  >
    <template #panel-encabezado-vis>
      <p
        id="titulo-mapa-pueblos-contexto"
        class="vis-titulo-visualizacion"
      >
        Pueblos indígenas y su contexto
      </p>

      <div class="contenedor-selectores grid">
        <div class="columna-7-esc">
          <BuscadorComunidades
            ref="buscadorComunidades"
            @alSeleccionarComunidad="valor => (puebloSeleccionado = valor)"
          />
        </div>

        <select
          class="columna-3-esc m-b-0"
          v-model="puebloSeleccionado"
          :disabled="pueblos.length === 0"
          @change="buscadorComunidades.busqueda = ''"
        >
          <option value="">Explora por pueblo</option>
          <option
            v-for="(pueblo, idx) in pueblos"
            :key="idx"
            :value="pueblo.clave"
          >
            {{ pueblo.nom_com }}
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
        para="p_indigenas_comunidades_17122021"
        globoInformativo=""
        v-globo-informacion="
          '<p>Son comunidades integrantes de un pueblo indígena, aquellas que formen una unidad social, económica y cultural, asentadas en un territorio y que reconocen autoridades propias de acuerdo con sus usos y costumbres.</p>' +
          '<p>Última actualización de la capa comunidades indígenas: 17/12/2021</p>'
        "
      />
      <SisdaiLeyenda
        para="pciaf_pob_indigena_asent_hist_20_loc_p"
        globoInformativo=""
        v-globo-informacion="
          'Territorio donde históricamente se han asentado los pueblos originarios. (INALI, 2009).'
        "
      />
      <SisdaiLeyenda
        para="pciaf_pob_indigena_residentes_20_loc_p"
        globoInformativo=""
        v-globo-informacion="
          'Localidad no identificada como asentamiento histórico del pueblo de referencia según el Catálogo de Lenguas Indígenas Nacionales del INALI.'
        "
      />
      <SisdaiLeyenda
        para="pciaf_territorios_pueb_indig_07_nal_a"
        globoInformativo=""
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
      :url="urls.wms"
    />

    <SisdaiCapaWms
      capa="gref_division_municipal_20_mun_a"
      :filtro="filtroEdoMun"
      posicion="3"
      :url="urls.wms"
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
      :url="urls.wms"
    />

    <SisdaiCapaWms
      capa="pciaf_pob_indigena_residentes_20_loc_p"
      id="pciaf_pob_indigena_residentes_20_loc_p"
      :filtro="filtroPueblosEdoMun"
      :globoInformativo="p => infoPueblos(p, 'residente')"
      nombre="Población indígena residente"
      posicion="5"
      :url="urls.wms"
    />

    <SisdaiCapaWms
      capa="pciaf_pob_indigena_asent_hist_20_loc_p"
      id="pciaf_pob_indigena_asent_hist_20_loc_p"
      :filtro="filtroPueblosEdoMun"
      :globoInformativo="p => infoPueblos(p, 'en asentamientos históricos')"
      nombre="Población indígena en asentamientos históricos"
      posicion="6"
      :url="urls.wms"
    />

    <SisdaiCapaWms
      capa="p_indigenas_comunidades_17122021"
      id="p_indigenas_comunidades_17122021"
      :filtro="
        filtroPueblosEdoMun !== undefined
          ? filtroPueblosEdoMun.replace('clave_pueblo', 'cve_pueblo1')
          : undefined
      "
      nombre="Comunidades indígenas"
      posicion="7"
      :url="urls.wms"
    />
    <!-- Capas Pueblos -->

    <!-- Capas Contexto -->
    <SisdaiCapaWms
      capa="pciaf_pob_ind_nucleos_agrarios_21_nal_a"
      id="pciaf_pob_ind_nucleos_agrarios_21_nal_a"
      :filtro="filtroEdoMun2"
      :globoInformativo="infoNucleo"
      nombre="Núcleos agrarios (selecciona un estado para ver esta capa)"
      posicion="8"
      :url="urls.wms"
      :visible="false"
    />

    <SisdaiCapaWms
      capa="gref_corredores_red_nac_caminos_21_nal_l"
      id="gref_corredores_red_nac_caminos_21_nal_l"
      nombre="Red Nacional de Caminos"
      posicion="9"
      :url="urls.wms"
      :visible="false"
    />

    <SisdaiCapaWms
      capa="educ_establecimientos_escolares_15_xy_p"
      id="educ_establecimientos_escolares_15_xy_p"
      :filtro="filtroEdoMun"
      nombre="Establecimientos escolares"
      posicion="10"
      :url="urls.wms"
      :visible="false"
    />

    <!-- - Hospitales -->
    <SisdaiCapaWms
      capa="salu_unidades_medicas_1n_clues_21_xy_p"
      id="salu_unidades_medicas_1n_clues_21_xy_p"
      :filtro="filtroEdoMun2"
      nombre="Primer nivel"
      posicion="11"
      :url="urls.wms"
      :visible="visibilidadHospitales[0]"
      @alCambiarVisibilidad="valor => (visibilidadHospitales[0] = valor)"
    />
    <SisdaiCapaWms
      capa="salu_unidades_medicas_2n_clues_21_xy_p"
      id="salu_unidades_medicas_2n_clues_21_xy_p"
      :filtro="filtroEdoMun"
      nombre="Segundo nivel"
      posicion="12"
      :url="urls.wms"
      :visible="visibilidadHospitales[1]"
      @alCambiarVisibilidad="valor => (visibilidadHospitales[1] = valor)"
    />
    <SisdaiCapaWms
      capa="salu_unidades_medicas_3n_clues_21_xy_p"
      id="salu_unidades_medicas_3n_clues_21_xy_p"
      :filtro="filtroEdoMun"
      nombre="Tercer nivel"
      posicion="13"
      :url="urls.wms"
      :visible="visibilidadHospitales[2]"
      @alCambiarVisibilidad="valor => (visibilidadHospitales[2] = valor)"
    />
    <!-- - Hospitalas -->

    <SisdaiCapaWms
      capa="pciaf_casas_comedores_ninez_ind_21_xy_p"
      id="pciaf_casas_comedores_ninez_ind_21_xy_p"
      :filtro="filtroEdoMun"
      nombre="Casas y Comedores del PAEI"
      posicion="14"
      :url="urls.wms"
      :visible="false"
    />
    <SisdaiCapaWms
      capa="pciaf_radiodifusoras_ind_160124_xy_p"
      id="pciaf_radiodifusoras_ind_160124_xy_p"
      :filtro="filtroEdoMun"
      nombre="Radiodifusoras del INPI"
      posicion="15"
      :url="urls.wms"
      :visible="false"
    />
    <SisdaiCapaWms
      capa="pciaf_oficinas_repre_inpi_160124_xy_p"
      id="pciaf_oficinas_repre_inpi_160124_xy_p"
      :filtro="filtroEdoMun"
      nombre="Oficinas de representación"
      posicion="16"
      :url="urls.wms"
      :visible="false"
    />
    <SisdaiCapaWms
      capa="pciaf_centros_coord_pue_ind_160124_xy_p"
      id="pciaf_centros_coord_pue_ind_160124_xy_p"
      :filtro="filtroEdoMun"
      nombre="Centros Coordinadores de Pueblos Indígenas"
      posicion="17"
      :url="urls.wms"
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
        globoInformativo=""
        v-globo-informacion:izquierda="
          'Programa de Apoyo a la Educación Indígena'
        "
      />

      <SisdaiLeyendaControl
        etiqueta="Hospitales"
        :encendido="visibilidadHospitales.some(v => v)"
        :encendidoIndeterminado="
          visibilidadHospitales.some(v => v) &&
          !visibilidadHospitales.every(v => v)
        "
        @alCambiar="valor => visibilidadHospitales.fill(valor)"
        globoInformativo=""
        v-globo-informacion:izquierda="
          'El Sistema de Salud en México está estructurado en diferentes niveles de atención, las cuales se diferencian por el grado de especialización de los servicios médicos ofrecidos.<br />' +
          'Para ver más información sobre estos puntos selecciónalos a nivel estatal (se desplegará el nombre de la unidad y su institución).'
        "
      />
      <SisdaiLeyenda
        class="p-l-3"
        para="salu_unidades_medicas_1n_clues_21_xy_p"
        globoInformativo=""
        v-globo-informacion:izquierda="
          'Forma la estructura básica de la atención médica ambulatoria en el Sistema de Salud, se prestan servicios de prevención de enfermedades (educación y vigilancia epidemológica), saneamiento básico y protección.<br />' +
          '<b>La capa fue estructurada con base en la metodología ETEC; las ubicaciones originales de las unidades se mantienen por lo que es posible que existan errores en la localización.</b>'
        "
      />
      <SisdaiLeyenda
        class="p-l-3"
        para="salu_unidades_medicas_2n_clues_21_xy_p"
        globoInformativo=""
        v-globo-informacion:izquierda="
          'Generalmente se proporciona consulta externa y/o hospitalización en las 4 necesidades básicas de la medicina (cirugía general, medicina interna, gineco-obstetricia y pediatría).<br />' +
          '<b>La capa fue estructurada con base en la metodología ETEC, se detectaron inconsistencias sobre las ubicaciones por lo que fueron revisadas y corregidas.</b>'
        "
      />
      <SisdaiLeyenda
        class="p-l-3"
        para="salu_unidades_medicas_3n_clues_21_xy_p"
        globoInformativo=""
        v-globo-informacion:izquierda="
          'Son las unidades médicas con mayor capacidad resolutiva del sistema de salud, el personal es especializado y los procedimientos realizados son de alta complejidad.<br />' +
          '<b>La capa fue estructurada con base en la metodología ETEC, se detectaron inconsistencias sobre las ubicaciones por lo que fueron revisadas y corregidas.</b>'
        "
      />
      <SisdaiLeyenda
        para="educ_establecimientos_escolares_15_xy_p"
        globoInformativo=""
        v-globo-informacion:izquierda="
          'Para ver más información sobre estos puntos selecciónalos a nivel estatal (se desplegará el nombre del establecimiento escolar y su Clave de Centro de Trabajo).'
        "
      />
      <SisdaiLeyenda para="gref_corredores_red_nac_caminos_21_nal_l" />
      <SisdaiLeyenda para="pciaf_pob_ind_nucleos_agrarios_21_nal_a" />
    </template>

    <template #panel-pie-vis>
      <a
        :href="`${urls.api}media/capa_comunidades_indigenas/capas_pueblos_indigenas.zip`"
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
