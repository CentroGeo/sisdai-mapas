<script setup>
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'
import { ref } from 'vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, theme, page, frontmatter } = useData()

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
    <SisdaiNavegacionPrincipal
      :nav-informacion="`Sección: <b>${page.title}</b>`"
      v-if="!frontmatter.soloMapa"
    >
      <ul class="nav-menu">
        <li v-for="nav in theme.nav">
          <a
            class="nav-hipervinculo"
            :class="{
              'router-link-exact-active router-link-active': isActive(
                page.relativePath,
                nav.activeMatch || nav.link,
                !!nav.activeMatch
              ),
            }"
            :href="nav.link"
            :target="nav.target"
            :rel="nav.rel"
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

    <div :class="{ flex: tieneSidebar(theme, page) }">
      <SisdaiMenuLateral
        v-if="tieneSidebar(theme, page)"
        class="columna-4-esc columna-1-mov"
      >
        <template #contenido-menu-lateral>
          <ul>
            <li v-for="sidebar in listaSidebar(theme, page).items">
              <a :href="sidebar.link">{{ sidebar.text }}</a>
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
        <div
          class="vista-inicio"
          v-if="frontmatter.home"
        >
          <img
            src="favicon.ico"
            alt="Icono de Conahcyt"
          />
          <h1 class="titulo-pagina">{{ site.title }}</h1>
          <p class="parrafo-texto-alto">{{ site.description }}</p>
          <a
            class="boton boton-primario"
            href="/comienza/"
          >
            Empezar
          </a>
        </div>

        <Content class="m-r-3" />

        <div
          class="m-r-3"
          v-if="!frontmatter.home"
        >
          <hr />
          <p>
            {{
              theme.lastUpdated?.text ||
              theme.lastUpdatedText ||
              'Última actualización'
            }}:
            <time :datetime="new Date(page.lastUpdated).toISOString()">{{
              new Intl.DateTimeFormat(
                'es-MX',
                theme.lastUpdated?.formatOptions ?? {
                  dateStyle: 'short',
                  timeStyle: 'short',
                }
              ).format(new Date(page.lastUpdated))
            }}</time>
          </p>
        </div>
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

<style lang="scss">
.vista-inicio {
  text-align: center;

  img {
    max-width: 100%;
    max-height: 280px;
  }
}
</style>
