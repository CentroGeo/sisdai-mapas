<script setup>
import { useAccesibilidadStore } from '@centrogeomx/sisdai-componentes/src/stores/accesibilidad'
import { useData } from 'vitepress'
import MenuLateral from './MenuLateral.vue'
import NavegacionPrincipal from './NavegacionPrincipal.vue'
import PaginaError404 from './PaginaError404.vue'
import { version } from './../../../package.json'

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter, page, theme } = useData()
const { MODE } = import.meta.env

const store = useAccesibilidadStore()
</script>

<template>
  <a
    href="#principal"
    class="ir-contenido-principal"
  >
    Ir a contenido principal
  </a>

  <SisdaiNavegacionGobMx />
  <NavegacionPrincipal
    :nav="theme.nav"
    :ruta="page.relativePath"
  />
  <SisdaiMenuAccesibilidad
    :objetoStore="store"
    perfilColor="sisdai"
  />

  <PaginaError404 v-if="page.isNotFound" />

  <main
    v-else-if="frontmatter.home"
    id="principal"
  >
    <Content class="contenedor m-y-10" />
  </main>

  <div
    class="flex"
    v-else
  >
    <div class="columna-4 columna-1-mov menu-lateral-fondo">
      <MenuLateral
        :sidebar="theme.sidebar"
        :ruta="page.relativePath"
      />
    </div>

    <main
      class="columna-12 columna-7-mov"
      id="principal"
    >
      <Content class="contenedor ancho-lectura m-y-maximo-esc" />
    </main>
  </div>

  <SisdaiPiePaginaConahcyt />
  <SisdaiPiePaginaGobMx />
  <SisdaiInfoDeDespliegue
    :entornoProyecto="MODE"
    :versionProyecto="version || 0"
    actualizacionProyecto="actualizacionProyecto"
  />
</template>
