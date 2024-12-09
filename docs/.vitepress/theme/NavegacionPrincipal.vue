<script setup>
import { isActive } from 'vitepress/dist/client/shared'
import { toRefs } from 'vue'

const props = defineProps(['nav', 'ruta'])
const { ruta } = toRefs(props)
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
        <b>Ir a SISDAI</b>
      </a>
    </template>
    <ul class="nav-menu">
      <li v-for="item in nav" :key="item.text">
        <a
          class="nav-hipervinculo"
          :class="{
            'router-link-exact-active router-link-active': isActive(
              ruta,
              item.activeMatch || item.link,
              !!item.activeMatch
            )
          }"
          :href="item.link"
          :target="item.target"
          :rel="item.rel"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </SisdaiNavegacionPrincipal>
</template>
