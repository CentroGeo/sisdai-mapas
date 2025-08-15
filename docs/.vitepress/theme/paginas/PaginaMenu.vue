<script setup>
import { useData } from 'vitepress'
import MenuLateral from '../componentes/MenuLateral.vue'

const { page, theme } = useData()
</script>

<template>
  <div class="flex">
    <div class="columna-4 columna-1-mov menu-lateral-fondo">
      <MenuLateral
        :sidebar="theme.sidebar"
        :ruta="page.relativePath"
      />
    </div>

    <main
      class="columna-12 columna-7-mov"
      id="principal"
    >
      <Content class="contenedor ancho-lectura m-y-maximo-esc" />
    </main>
  </div>
</template>
