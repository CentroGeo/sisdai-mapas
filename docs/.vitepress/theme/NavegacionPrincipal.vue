<script setup>
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'

// https://vitepress.dev/reference/runtime-api#usedata
const { theme, page } = useData()
</script>

<template>
  <SisdaiNavegacionPrincipal>
    <template #complementario>
      <a
        class="nav-hipervinculo"
        href="https://sisdai.conahcyt.mx"
        target="_blank"
        rel="noopener noreferrer"
      >
        <b>IR A SISDAI</b>
      </a>
    </template>
    <ul class="nav-menu">
      <li v-for="nav in theme.nav" :key="nav.text">
        <a
          class="nav-hipervinculo"
          :class="{
            'router-link-exact-active router-link-active': isActive(
              page.relativePath,
              nav.activeMatch || nav.link,
              !!nav.activeMatch
            )
          }"
          :href="nav.link"
          :target="nav.target"
          :rel="nav.rel"
        >
          <img v-if="nav.img" class="nav-logo" :src="nav.img" alt="" />
          {{ nav.text }}
        </a>
      </li>
    </ul>
  </SisdaiNavegacionPrincipal>
</template>
