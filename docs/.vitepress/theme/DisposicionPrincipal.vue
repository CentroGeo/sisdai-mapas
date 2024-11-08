<script setup>
import ContenidoPrincipal from './ContenidoPrincipal.vue'
import MenuLateral from './MenuLateral.vue'
import NavegacionPrincipal from './NavegacionPrincipal.vue'
import Pagina404 from './Pagina404.vue'
// import PaginaInicio from './PaginaInicio.vue'
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import 'sisdai-css'

const { hasSidebar } = useSidebar()
const { page /*, frontmatter*/ } = useData()

</script>

<template>
  <div>
    <a href="#principal" class="ir-contenido-principal">Ir a contenido principal</a>

    <SisdaiNavegacionGobMx />
    <NavegacionPrincipal />
    <SisdaiMenuAccesibilidad perfilColor="sisdai" />

    <Pagina404 v-if="page.isNotFound" />

    <!-- <PaginaInicio v-else-if="frontmatter.layout === 'inicio'" /> -->

    <div v-else>
      <div class="flex" v-if="hasSidebar">
        <div class="columna-4 columna-1-mov menu-lateral-fondo">
          <MenuLateral />
        </div>
        <div class="columna-12 columna-7-mov">
          <ContenidoPrincipal />
        </div>
      </div>

      <ContenidoPrincipal v-else />
    </div>

    <SisdaiPiePaginaConahcyt />
    <SisdaiPiePaginaGobMx />
    <SisdaiInfoDeDespliegue entornoProyecto="-" versionProyecto="-" actualizacionProyecto="-" />
  </div>
</template>
