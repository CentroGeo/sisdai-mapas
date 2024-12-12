<script setup>
import { isActive } from 'vitepress/dist/client/shared'
import { toRefs } from 'vue'
import { useRoute } from 'vitepress'

const props = defineProps(['sidebar', 'ruta'])
const { ruta } = toRefs(props)
const route = useRoute()

</script>

<template>
  <SisdaiMenuLateral>
    <template #contenido-menu-lateral>
      <div v-if="!route.path.includes('mapas')">
        <ul v-for="side in sidebar[
            Object.keys(sidebar).find(path => isActive(ruta, path, !!path))
          ]"
          :key="`colapsable-${side.text}`">
          <li
            v-for="item in side.items"
            :key="`ruta-${item.text}`"
          >
            <a
              :href="item.link"
              :class="{
                'router-link-exact-active router-link-active': isActive(ruta, item.link),
              }"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
      <div v-else>
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
                      :class="{
                      'router-link-exact-active router-link-active': isActive(
                        ruta,
                        item.link
                      ),
                    }"
                    >
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </template>
            </SisdaiColapsableNavegacion>
          </li>
        </ul>
      </div>
    </template>
  </SisdaiMenuLateral>
</template>

