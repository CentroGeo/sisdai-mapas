<script setup>
// import SisdaiMenuAccesibilidad from 'sisdai-componentes/src/componentes/menu-accesibilidad/SisdaiMenuAccesibilidad.vue'
// import SisdaiMenuLateral from 'sisdai-componentes/src/componentes/menu-lateral/SisdaiMenuLateral.vue'
// import SisdaiNavegacionGobMx from 'sisdai-componentes/src/componentes/navegacion-gob-mx/SisdaiNavegacionGobMx.vue'
// import SisdaiNavegacionPrincipal from 'sisdai-componentes/src/componentes/navegacion-principal/SisdaiNavegacionPrincipal.vue'
// import SisdaiPiePaginaConahcyt from 'sisdai-componentes/src/componentes/pie-pagina-conahcyt/SisdaiPiePaginaConahcyt.vue'
// import SisdaiPiePaginaGobMx from 'sisdai-componentes/src/componentes/pie-pagina-gob-mx/SisdaiPiePaginaGobMx.vue'
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'
import { ref } from 'vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, theme, page, frontmatter } = useData()

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
  <div :class="clasesAccesibles">
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
          'contenedor ancho-lectura': frontmatter.home,
        }"
      >
        <div
          class="titulo-inicio"
          v-if="frontmatter.home"
        >
          <h1>{{ site.title }}</h1>
          <p>{{ site.description }}</p>
        </div>

        <Content />
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
      </main>
    </div>

    <SisdaiMenuAccesibilidad
      @alSeleccionarOpcion="agregarClases"
      @restablecer="clasesAccesibles = []"
    />
    <SisdaiPiePaginaConahcyt v-if="!frontmatter.soloMapa" />
    <SisdaiPiePaginaGobMx v-if="!frontmatter.soloMapa" />
    <SisdaiInfoDeDespliegue
      versionProyecto="-"
      entornoProyecto="-"
      actualizacionProyecto="-"
    />
  </div>
</template>
