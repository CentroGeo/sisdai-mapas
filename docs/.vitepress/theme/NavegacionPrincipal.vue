<script setup>
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'

import SisdaiNavegacionPrincipal from 'sisdai-componentes/src/componentes/navegacion-principal/SisdaiNavegacionPrincipal.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { theme, page } = useData()
</script>

<template>
  <SisdaiNavegacionPrincipal :nav-informacion="`Sección: <b>${page.title}</b>`">
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
      <!-- <li v-for="social in theme.socialLinks">
        <a
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-hipervinculo"
        >
          <span :class="`icono-social-${social.icon}`" />
        </a>
      </li> -->
    </ul>
  </SisdaiNavegacionPrincipal>
</template>
