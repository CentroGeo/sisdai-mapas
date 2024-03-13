<script setup>
import SisdaiColapsableNavegacion from 'sisdai-componentes/src/componentes/colapsable-navegacion/SisdaiColapsableNavegacion.vue'
import SisdaiInfoDeDespliegue from 'sisdai-componentes/src/componentes/info-de-despliegue/SisdaiInfoDeDespliegue.vue'
import SisdaiMenuAccesibilidad from 'sisdai-componentes/src/componentes/menu-accesibilidad/SisdaiMenuAccesibilidad.vue'
import SisdaiMenuLateral from 'sisdai-componentes/src/componentes/menu-lateral/SisdaiMenuLateral.vue'
import SisdaiNavegacionGobMx from 'sisdai-componentes/src/componentes/navegacion-gob-mx/SisdaiNavegacionGobMx.vue'
import SisdaiPiePaginaConahcyt from 'sisdai-componentes/src/componentes/pie-pagina-conahcyt/SisdaiPiePaginaConahcyt.vue'
import SisdaiPiePaginaGobMx from 'sisdai-componentes/src/componentes/pie-pagina-gob-mx/SisdaiPiePaginaGobMx.vue'
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'
import { ref } from 'vue'
import NavegacionPrincipal from './NavegacionPrincipal.vue'
import PiePagina from './PiePagina.vue'
import VistaInicio from './VistaInicio.vue'
// import {
//   SisdaiColapsableNavegacion,
//   SisdaiInfoDeDespliegue,
//   SisdaiMenuAccesibilidad,
//   SisdaiMenuLateral,
//   SisdaiNavegacionGobMx,
//   SisdaiPiePaginaConahcyt,
//   SisdaiPiePaginaGobMx,
// } from 'sisdai-componentes'

// https://vitepress.dev/reference/runtime-api#usedata
const { theme, page, frontmatter } = useData()

const menuAccesibilidad = ref(null)

function listaSidebar({ sidebar }, { relativePath }) {
  return sidebar[
    Object.keys(sidebar).find(side => isActive(relativePath, side, !!side))
  ]
}

function tieneSidebar(theme, page) {
  return listaSidebar(theme, page) !== undefined
}
</script>

<template>
  <div :class="menuAccesibilidad?.clasesSelecciondas">
    <SisdaiNavegacionGobMx v-if="!frontmatter.soloMapa" />
    <NavegacionPrincipal v-if="!frontmatter.soloMapa" />

    <div :class="{ flex: tieneSidebar(theme, page) }">
      <SisdaiMenuLateral
        v-if="tieneSidebar(theme, page)"
        class="columna-4-esc columna-1-mov"
      >
        <template #contenido-menu-lateral>
          <ul>
            <li>
              <SisdaiColapsableNavegacion
                v-for="sidebar in listaSidebar(theme, page)"
                :colapsado="true"
              >
                <template #encabezado>
                  <span>{{ sidebar.text }}</span>
                </template>
                <template #contenido>
                  <ul>
                    <li v-for="item in sidebar.items">
                      <a
                        :href="item.link"
                        class="p-x-6-esc p-x-4-mov p-y-1"
                      >
                        {{ item.text }}
                      </a>
                    </li>
                  </ul>
                </template>
                <!-- <template #listado-contenido>
                  <li v-for="item in sidebar.items">
                    <a :href="item.link">{{ item.text }}</a>
                  </li>
                </template> -->
              </SisdaiColapsableNavegacion>
            </li>
          </ul>
        </template>
      </SisdaiMenuLateral>

      <main
        :class="{
          'columna-12-esc columna-7-mov': tieneSidebar(theme, page),
          'contenedor ancho-lectura m-y-5': frontmatter.home,
        }"
      >
        <VistaInicio v-if="frontmatter.home" />

        <Content class="m-r-3" />

        <PiePagina
          class="m-r-3"
          v-if="!frontmatter.home"
        />
      </main>
    </div>

    <SisdaiMenuAccesibilidad ref="menuAccesibilidad" />
    <SisdaiPiePaginaConahcyt v-if="!frontmatter.soloMapa" />
    <SisdaiPiePaginaGobMx v-if="!frontmatter.soloMapa" />
    <SisdaiInfoDeDespliegue
      versionProyecto="-"
      entornoProyecto="-"
      actualizacionProyecto="-"
    />
  </div>
</template>
<style lang="scss" scoped>
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/navegacion/menu-lateral';
@import 'sisdai-css/src/navegacion/colapsable-navegacion';
</style>
