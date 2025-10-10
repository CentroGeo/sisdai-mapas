<script setup>
import { useData } from 'vitepress'
import PaginaError404 from './paginas/PaginaError404.vue'
import PaginaInicio from './paginas/PaginaInicio.vue'
import PaginaMenu from './paginas/PaginaMenu.vue'
import NavegacionPrincipal from './componentes/NavegacionPrincipal.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter, page, theme } = useData()
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
  <SisdaiMenuAccesibilidad perfilColor="sisdai" />

  <PaginaError404 v-if="page.isNotFound" />

  <PaginaInicio v-else-if="frontmatter.home" />

  <PaginaMenu v-else />

  <SisdaiPiePaginaConahcyt />
  <SisdaiPiePaginaGobMx />
</template>
