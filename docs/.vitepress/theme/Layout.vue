<script setup>
import SisdaiMenuLateral from 'sisdai-componentes/src/componentes/menu-lateral/SisdaiMenuLateral.vue'
import SisdaiNavegacionGobMx from 'sisdai-componentes/src/componentes/navegacion-gob-mx/SisdaiNavegacionGobMx.vue'
import SisdaiNavegacionPrincipal from 'sisdai-componentes/src/componentes/navegacion-principal/SisdaiNavegacionPrincipal.vue'
import SisdaiPiePaginaConahcyt from 'sisdai-componentes/src/componentes/pie-pagina-conahcyt/SisdaiPiePaginaConahcyt.vue'
import SisdaiPiePaginaGobMx from 'sisdai-componentes/src/componentes/pie-pagina-gob-mx/SisdaiPiePaginaGobMx.vue'
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, theme, page, frontmatter } = useData()

const pathIn = computed(() => useRoute().data.relativePath.split('/')[0])
</script>

<template>
  <div>
    <SisdaiNavegacionGobMx />
    <SisdaiNavegacionPrincipal
      :nav-informacion="`Sección: <b>${page.title}</b>`"
    >
      <ul class="nav-menu">
        <li v-for="nav in theme.nav">
          <a
            :href="nav.link"
            class="nav-hipervinculo"
          >
            {{ nav.text }}
          </a>
        </li>
        <li v-for="social in theme.socialLinks">
          <a
            class="nav-hipervinculo"
            :href="social.link"
          >
            <span :class="`icono-social-${social.icon}`" />
          </a>
        </li>
      </ul>
    </SisdaiNavegacionPrincipal>

    <div v-if="frontmatter.home">
      <h1>{{ site.title }}</h1>
      <p>{{ site.description }}</p>
      <p>{{ frontmatter }}</p>

      <Content />
    </div>

    <div
      class="flex"
      v-else
    >
      <SisdaiMenuLateral class="columna-4-esc columna-1-mov">
        <template #contenido-menu-lateral>
          <ul>
            <li v-for="sidebar in theme.sidebar[pathIn][0].items">
              <a :href="sidebar.link">{{ sidebar.text }}</a>
            </li>
          </ul>
        </template>
      </SisdaiMenuLateral>

      <div class="columna-12-esc columna-7-mov">
        <Content />
      </div>
    </div>

    <SisdaiPiePaginaConahcyt />
    <SisdaiPiePaginaGobMx />
  </div>
</template>
