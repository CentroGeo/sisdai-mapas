<script setup>
import { isActive } from 'vitepress/dist/client/shared'
import { toRefs } from 'vue'

const props = defineProps(['sidebar', 'ruta'])
const { ruta } = toRefs(props)
</script>

<template>
  <SisdaiMenuLateral>
    <template #contenido-menu-lateral>
      <ul>
        <li
          v-for="side in sidebar[
            Object.keys(sidebar).find(path => isActive(ruta, path, !!path))
          ]"
          :key="`colapsable-${side.text}`"
        >
          <SisdaiColapsableNavegacion :colapsado="!side.collapsed">
            <template #encabezado>{{ side.text }}</template>
            <template #contenido>
              <ul>
                <li
                  v-for="item in side.items"
                  :key="`ruta-${item.text}`"
                >
                  <a
                    :href="item.link"
                    exact
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </template>
          </SisdaiColapsableNavegacion>
        </li>
      </ul>
    </template>
  </SisdaiMenuLateral>
</template>
