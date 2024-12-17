<script setup>
import MapaBasico from "./../.vitepress/ejemplos/MapaBasico.vue";
import { version } from './../../package.json'
</script>

# Instalación

Instalación desde npm:

```sh
npm i @centrogeomx/sisdai-mapas
```

Instalación desde su repositorio:

```sh
npm i git+https://codigo.conahcyt.mx/sisdai/sisdai-mapas#vN.N.N
```

Actualmente la versión más estable es: v{{ version }}.

## Importación y registro

En el archivo que se desee utilizar el componente:

```js
import SisdaiMapas from '@centrogeomx/sisdai-mapas'
import App from './App.vue'

const app = createApp(App)
app.use(SisdaiMapas)
```

Si se utiliza el componente sisdai-mapas en dos archivos o más, se recomienda
registrar el componente en el archivo `src/main.js` del proyecto.

## Crear un mapa básico

Dentro del componente en el que se desee crear mapas con el diseño sisdai, usa
la etiqueta `SisdaiMapa` dentro del `template` del HTML y agrega las capas y
directivas que necesites:

<MapaBasico />

<<< @/.vitepress/ejemplos/MapaBasico.vue{2-10}

<!-- ## Documentación en local

Para revisar la documentación en local primero clona este repositorio y accede a
la carpeta del proyecto con:

```bash
git clone https://codigo.conahcyt.mx/sisdai/sisdai-mapas.git
cd sisdai-mapas
```

Seguido de la instalación de las dependencias y ejecución de vuepress:

```bash
npm install
npm run docs
``` -->

<!-- Se habilitara en [localhost:5173](http://localhost:5173) (por defecto). -->
