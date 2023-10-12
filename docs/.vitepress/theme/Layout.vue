<script setup>
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'
import { ref } from 'vue'
import NavegacionPrincipal from './NavegacionPrincipal.vue'
import PiePagina from './PiePagina.vue'
import VistaInicio from './VistaInicio.vue'

import SisdaiColapsableNavegacion from 'sisdai-componentes/src/componentes/colapsable-navegacion/SisdaiColapsableNavegacion.vue'
import SisdaiMenuLateral from 'sisdai-componentes/src/componentes/menu-lateral/SisdaiMenuLateral.vue'
import SisdaiNavegacionGobMx from 'sisdai-componentes/src/componentes/navegacion-gob-mx/SisdaiNavegacionGobMx.vue'

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
            <SisdaiColapsableNavegacion
              v-for="sidebar in listaSidebar(theme, page)"
              :titulo="sidebar.text"
              :activo="true"
            >
              <template #listado-contenido>
                <li v-for="item in sidebar.items">
                  <a :href="item.link">{{ item.text }}</a>
                </li>
              </template>
            </SisdaiColapsableNavegacion>
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
