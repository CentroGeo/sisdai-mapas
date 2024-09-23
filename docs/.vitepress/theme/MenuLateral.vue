<script setup>
import { useSidebar } from 'vitepress/theme'

const { sidebar } = useSidebar()
</script>

<template>
  <SisdaiMenuLateral>
    <template #contenido-menu-lateral>
      <ul v-for="side in sidebar">
        <li v-for="item in side.items">
          <a :href="item.link">{{ item.text }}</a>
          <!-- <SisdaiColapsableNavegacion></SisdaiColapsableNavegacion> -->
        </li>
      </ul>
    </template>
  </SisdaiMenuLateral>
</template>
