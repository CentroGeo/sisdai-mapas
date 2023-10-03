<script setup>
import EjemploBasico from "./../.vitepress/components/basico.vue";
</script>

# Introducción

**Sisdai-mapas** es una biblioteca de componentes de [Vue.js](https://vuejs.org/) para generar mapas interactivos con datos georeferenciados. Está creada con [Vue.js](https://vuejs.org/) y la versión 8.1.0 de [OpenLayers](https://openlayers.org/).

## Instalación

Instalación y descarga de la biblioteca desde GitHub:

```sh
npm i github:salsa-community/sisdai-mapas#version-a-instalar
```

## Importación y registro

En el archivo que se desee utilizar el componente:

```js
import Vue from 'vue'
import SisdaiMapas from 'sisdai-mapas'
Vue.use(SisdaiMapas)
```

Si se utiliza el componente sisdai-mapas en dos archivos o más, se recomienda registrar el componente en el archivo `src/main.js` del proyecto.

## Crear un mapa básico

Dentro del componente en el que se desee crear mapas con el diseño sisdai, usa la etiqueta `SisdaiMapa` dentro del `template` del HTML y agrega las capas y directivas que necesites:

Código:

<<< @/.vitepress/components/basico.vue{2-4}

Resultado:

<EjemploBasico />

## Documentación en local

Para revisar la documentación en local primero clona este repositorio y accede a la carpeta del proyecto con:

```bash
git clone https://github.com/salsa-community/sisdai-mapas
cd sisdai-mapas
```

Seguido de la instalación de las dependencias y ejecución de vuepress:

```bash
npm install
npm run docs
```

<!-- Se habilitara en [localhost:5173](http://localhost:5173) (por defecto). -->

## Contribución

Si quieres contribuir al código de esta boblioteca revisa los [lineamientos de contribución establecidos por SALSA](https://salsa.crip.conacyt.mx/guidelines/contribute/)
