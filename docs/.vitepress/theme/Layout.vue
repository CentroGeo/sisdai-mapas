<script setup>
import SisdaiMenuAccesibilidad from 'sisdai-componentes/src/componentes/menu-accesibilidad/SisdaiMenuAccesibilidad.vue'
import SisdaiMenuLateral from 'sisdai-componentes/src/componentes/menu-lateral/SisdaiMenuLateral.vue'
import SisdaiNavegacionGobMx from 'sisdai-componentes/src/componentes/navegacion-gob-mx/SisdaiNavegacionGobMx.vue'
import SisdaiNavegacionPrincipal from 'sisdai-componentes/src/componentes/navegacion-principal/SisdaiNavegacionPrincipal.vue'
import SisdaiPiePaginaConahcyt from 'sisdai-componentes/src/componentes/pie-pagina-conahcyt/SisdaiPiePaginaConahcyt.vue'
import SisdaiPiePaginaGobMx from 'sisdai-componentes/src/componentes/pie-pagina-gob-mx/SisdaiPiePaginaGobMx.vue'
import { useData, useRoute } from 'vitepress'
import { computed, ref } from 'vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, theme, page, frontmatter } = useData()

const seccion = computed(() => useRoute().data.relativePath.split('/')[0])

const clasesAccesibles = ref([])

function eliminarClase(claseCss) {
  clasesAccesibles.value = clasesAccesibles.value.filter(
    clase => clase !== claseCss
  )
}

function agregarClases({ claseCss }) {
  if (!clasesAccesibles.value.includes(claseCss)) {
    clasesAccesibles.value.push(claseCss)
  } else {
    eliminarClase(claseCss)
  }
}
</script>

<template>
  <div :class="clasesAccesibles">
    <SisdaiNavegacionGobMx v-if="!frontmatter.soloMapa" />
    <SisdaiNavegacionPrincipal
      :nav-informacion="`Sección: <b>${page.title}</b>`"
      v-if="!frontmatter.soloMapa"
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
            :href="social.link"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-hipervinculo"
          >
            <span :class="`icono-social-${social.icon}`" />
          </a>
        </li>
      </ul>
    </SisdaiNavegacionPrincipal>

    <main
      v-if="frontmatter.home || frontmatter.soloMapa"
      :class="frontmatter.soloMapa ? '' : 'contenedor ancho-lectura'"
    >
      <div
        class="titulo-inicio"
        v-if="!frontmatter.soloMapa"
      >
        <h1>{{ site.title }}</h1>
        <p>{{ site.description }}</p>
      </div>

      <div v-if="frontmatter.soloMapa">regresar</div>

      <Content />
    </main>

    <div
      class="flex"
      v-else
    >
      <SisdaiMenuLateral class="columna-4-esc columna-1-mov">
        <template #contenido-menu-lateral>
          <ul>
            <li v-for="sidebar in theme.sidebar[seccion][0].items">
              <a :href="sidebar.link">{{ sidebar.text }}</a>
            </li>
          </ul>
        </template>
      </SisdaiMenuLateral>

      <main class="columna-12-esc columna-7-mov">
        <Content />
      </main>
    </div>

    <SisdaiMenuAccesibilidad
      @alSeleccionarOpcion="agregarClases"
      @restablecer="clasesAccesibles = []"
    />
    <SisdaiPiePaginaConahcyt v-if="!frontmatter.soloMapa" />
    <SisdaiPiePaginaGobMx v-if="!frontmatter.soloMapa" />
  </div>
</template>
