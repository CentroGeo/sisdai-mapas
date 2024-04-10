<script setup>
import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <div class="vista-inicio">
    <img
      src="/favicon.ico"
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
</template>

<style lang="scss" scoped>
.vista-inicio {
  text-align: center;

  img {
    max-width: 100%;
    max-height: 280px;
  }
}
</style>
