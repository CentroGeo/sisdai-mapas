<script setup>
import SisdaiNavegacionGobMx from 'sisdai-componentes/src/componentes/navegacion-gob-mx/SisdaiNavegacionGobMx.vue'
import SisdaiNavegacionPrincipal from 'sisdai-componentes/src/componentes/navegacion-principal/SisdaiNavegacionPrincipal.vue'
import SisdaiPiePaginaConahcyt from 'sisdai-componentes/src/componentes/pie-pagina-conahcyt/SisdaiPiePaginaConahcyt.vue'
import SisdaiPiePaginaGobMx from 'sisdai-componentes/src/componentes/pie-pagina-gob-mx/SisdaiPiePaginaGobMx.vue'
import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site } = useData()
</script>

<template>
  <div>
    <SisdaiNavegacionGobMx />
    <SisdaiNavegacionPrincipal>
      <ul class="nav-menu">
        <a
          class="nav-hipervinculo"
          href="https://github.com/salsa-community/sisdai-mapas"
        >
          GitHub
        </a>
      </ul>
    </SisdaiNavegacionPrincipal>

    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>

    <Content />

    <SisdaiPiePaginaConahcyt />
    <SisdaiPiePaginaGobMx />
  </div>
</template>
