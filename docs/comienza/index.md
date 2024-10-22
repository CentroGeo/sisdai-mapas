<script setup>
import EjemploBasico from "./../.vitepress/components/basico.vue";
import { dependencies, version } from './../../package.json'
</script>

# Introducción

**Sisdai-mapas** es una biblioteca de componentes de [Vue.js](https://vuejs.org/) para generar mapas interactivos con datos georeferenciados. Está creada con [Vue.js](https://vuejs.org/) y la versión `{{ dependencies.ol.replace('^', '') }}` de [OpenLayers](https://openlayers.org/).

## Instalación

Instalación y descarga de la biblioteca:

```sh
npm i git+https://codigo.conahcyt.mx/sisdai/sisdai-mapas#version-a-instalar
```

Actualmente la versión más estable es: v{{ version }}.

## Importación y registro

En el archivo que se desee utilizar el componente:

```js
import SisdaiMapas from 'sisdai-mapas'
import App from './App.vue'

const app = createApp(App)
app.use(SisdaiMapas)
```

Si se utiliza el componente sisdai-mapas en dos archivos o más, se recomienda registrar el componente en el archivo `src/main.js` del proyecto.

## Crear un mapa básico

Dentro del componente en el que se desee crear mapas con el diseño sisdai, usa la etiqueta `SisdaiMapa` dentro del `template` del HTML y agrega las capas y directivas que necesites:

Código:

<<< @/.vitepress/components/basico.vue{2-4}

<!-- <<< ./basico.vue{2-4} -->

Resultado:

<EjemploBasico />

## Documentación en local

Para revisar la documentación en local primero clona este repositorio y accede a la carpeta del proyecto con:

```bash
git clone https://codigo.conahcyt.mx/sisdai/sisdai-mapas.git
cd sisdai-mapas
```

Seguido de la instalación de las dependencias y ejecución de vuepress:

```bash
npm install
npm run docs
```

<!-- Se habilitara en [localhost:5173](http://localhost:5173) (por defecto). -->

<!-- ## Contribución

Si quieres contribuir al código de esta boblioteca revisa los [lineamientos de contribución establecidos por SALSA](https://salsa.crip.conacyt.mx/guidelines/contribute/) -->
