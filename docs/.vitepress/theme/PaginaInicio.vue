<script setup>
import { useData } from 'vitepress'
import pkg from './../../../package.json'

// https://vitepress.dev/es/reference/runtime-api#usedata
const { site } = useData()
</script>

<template>
  <main role="main" id="principal" class="contenedor ancho-lectura m-y-10">
    <h1 class="texto-centrado">{{ site.title }}</h1>
    <p>{{ site.description }}</p>

    <div class="flex flex-contenido-centrado">
      <div class="columna-16">
        <a
          class="tarjeta tarjeta-hipervinculo-externo"
          :href="pkg.repository.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="tarjeta-imagen"
            src="https://cdn.conacyt.mx/sisdai/recursos/imagenes/documentacion/gitlab.png"
            alt=""
          />
          <div class="tarjeta-degradado">
            <div class="tarjeta-cuerpo">
              <p class="h4">
                Ir al repositorio {{ site.title }}
                <span class="pictograma-flecha-arriba-derecha" />
              </p>
            </div>
          </div>
        </a>
      </div>

      <div class="columna-16">
        <a
          class="tarjeta tarjeta-hipervinculo-externo"
          href="https://sisdai.conahcyt.mx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="tarjeta-imagen"
            src="https://cdn.conacyt.mx/sisdai/recursos/imagenes/documentacion/sisdai.png"
            alt=""
          />
          <div class="tarjeta-degradado">
            <div class="tarjeta-cuerpo">
              <p class="h4">
                Ir al Sisdai
                <span class="pictograma-flecha-arriba-derecha" />
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>
