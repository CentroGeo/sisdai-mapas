---
home: true
---

<script setup>
import { useData } from 'vitepress'

// https://vitepress.dev/es/reference/runtime-api#usedata
const { site } = useData()
const cdn = import.meta.env.VITE_CDN_ARCHIVOS
</script>

<section id="introduccion" class="m-y-10">
  <div class="ancho-lectura">
    <h1 class="texto-centrado">{{ site.title }}</h1>
    <p>
      Esta es la documentación para personas desarrolladoras de la biblioteca de mapas del
      Sistema de Diseño y Accesibilidad para la Investigación (<a
        href="https://sisdai.conahcyt.mx/"
        target="_blank"
        >Sisdai</a
      >).
    </p>
  </div>
  <div class="flex">
    <div class="columna-8">
      <a class="tarjeta tarjeta-hipervinculo-interno" href="/comienza/">
        <picture>
          <source :srcset="`${cdn}inicio/comienza.webp`" type="image/webp" />
          <img
            loading="lazy"
            class="tarjeta-imagen"
            :src="`${cdn}inicio/comienza.png`"
            alt=""
          />
        </picture>
        <div class="tarjeta-cuerpo">
          <p class="tarjeta-titulo">Comienza</p>
          <p class="tarjeta-etiqueta">Conoce, instala y comienza a usar los mapas de Sisdai</p>
        </div>
      </a>
    </div>
    <div class="columna-8">
      <a class="tarjeta tarjeta-hipervinculo-interno" href="/mapas/">
        <picture>
          <source :srcset="`${cdn}inicio/tarjeta-mapas-esc.webp`" type="image/webp" />
          <img
            loading="lazy"
            class="tarjeta-imagen"
            :src="`${cdn}inicio/tarjeta-mapas-esc.png`"
            alt=""
          />
        </picture>
        <div class="tarjeta-cuerpo">
          <p class="tarjeta-titulo">Mapas</p>
          <p class="tarjeta-etiqueta">
            Documentación, uso y ejemplos de mapas y sus propiedadess
          </p>
        </div>
      </a>
    </div>
  </div>
</section>

<section id="otras-biliotecas" class="m-y-10">
  <div class="contenedor ancho-lectura">
    <h2 class="texto-centrado">Otras bibliotecas Sisdai</h2>
  </div>
  <div class="contenedor m-y-10">
    <div class="flex">
      <div class="columna-8 columna-4-esc">
        <div class="tarjeta">
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-css.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-css.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="tarjeta-titulo">sisdai-css</p>
            <p>
              Biblioteca donde se definen las hojas de estilos usados en el Sisdai. Está
              construida en scss con sass.
            </p>
          </div>
          <div class="tarjeta-pie flex">
            <SisdaiEnlaceExterno
              class="boton boton-primario boton-chico"
              enlace="https://sisdai-css.conahcyt.mx/"
              texto="Ir a biblioteca"
              aria-label="Ir a biblioteca sisdai css"
            />
            <SisdaiEnlaceExterno
              class="boton boton-secundario boton-chico"
              enlace="https://codigo.conahcyt.mx/sisdai/sisdai-css"
              texto="Ir a repositorio"
              aria-label="Ir a repositorio de código de sisdai css"
            />
          </div>
        </div>
      </div>
      <div class="columna-8 columna-4-esc">
        <div class="tarjeta">
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-componentes.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-componentes.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="tarjeta-titulo">sisdai-componentes</p>
            <p>
              Biblioteca de componentes reutilizables alineada al Sistema de Diseño y
              Accesibilidad para la Investigación (Sisdai).
            </p>
          </div>
          <div class="tarjeta-pie flex">
            <SisdaiEnlaceExterno
              class="boton boton-primario boton-chico"
              enlace="https://sisdai-componentes.conahcyt.mx/"
              texto="Ir a biblioteca"
              aria-label="Ir a biblioteca sisdai componentes"
            />
            <SisdaiEnlaceExterno
              class="boton boton-secundario boton-chico"
              enlace="https://codigo.conahcyt.mx/sisdai/sisdai-componentes"
              texto="Ir a repositorio"
              aria-label="Ir a repositorio de código de sisdai componentes"
            />
          </div>
        </div>
      </div>
      <div class="columna-8 columna-4-esc">
        <div class="tarjeta">
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-graficas.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-graficas.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="tarjeta-titulo">sisdai-graficas</p>
            <p>
              Biblioteca de componentes de código abierto para la construcción de
              visualizaciones de datos.
            </p>
          </div>
          <div class="tarjeta-pie flex">
            <SisdaiEnlaceExterno
              class="boton boton-primario boton-chico"
              enlace="https://sisdai-graficas.conahcyt.mx/"
              texto="Ir a biblioteca"
              aria-label="Ir a biblioteca sisdai gráficas"
            />
            <SisdaiEnlaceExterno
              class="boton boton-secundario boton-chico"
              enlace="https://codigo.conahcyt.mx/sisdai/sisdai-graficas"
              texto="Ir a repositorio"
              aria-label="Ir a repositorio de código de sisdai gráficas"
            />
          </div>
        </div>
      </div>
      <div class="columna-8 columna-4-esc">
        <div class="tarjeta">
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-sisdai.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-sisdai.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="tarjeta-titulo">Portal Sisdai</p>
            <p>
              Fundamentos, elementos, componentes, visualizaciones de datos y plantillas de
              diseño.
            </p>
          </div>
          <div class="tarjeta-pie">
            <SisdaiEnlaceExterno
              class="boton boton-primario boton-chico"
              enlace="https://sisdai.conahcyt.mx/"
              texto="Ir a Sisdai"
              aria-label="Ir a Portal Sisdai"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
