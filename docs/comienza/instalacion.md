<script setup>
import MapaBasico from '@ejemplos/MapaBasico.vue';
import { version } from '@centrogeomx/sisdai-mapas/package.json'
</script>

# Instalación

Instalación desde npm:

```sh
npm i @centrogeomx/sisdai-mapas
```

Instalación desde su repositorio:

```sh
npm i git+https://github.com/CentroGeo/sisdai-mapas#vN.N.N
```

En dónde `#vN.N.N` es la versión que se requiera instalar. Actualmente la
versión estable es: v{{ version }}.

## Importación y registro

En el archivo que se desee utilizar el componente:

```vue
<script setup>
import { SisdaiMapa, SisdaiCapaXyz } from '@centrogeomx/sisdai-mapas'
</script>

<template>
  <SisdaiMapa>
    <!-- Aquí van las capas, leyendas y paneles que quedarán dentro del mapa -->
    <SisdaiCapaXyz />
  </SisdaiMapa>
</template>
```

Si se utilizan los componentes de sisdai-mapas en dos archivos o más, se
recomienda registrar el componente en el archivo `src/main.js` del proyecto de
la siguiente manera:

```js{1,5}
import SisdaiMapas from '@centrogeomx/sisdai-mapas'
import App from './App.vue'

const app = createApp(App)
app.use(SisdaiMapas)
```

## Crear un mapa básico

Dentro del componente en el que se desee crear mapas con el diseño sisdai, usa
la etiqueta `SisdaiMapa` dentro del `template` del HTML y agrega las capas y
directivas que necesites:

<MapaBasico />

<<< @/.vitepress/theme/ejemplos/MapaBasico.vue{2-8}

<!-- ## Documentación en local

Para revisar la documentación en local primero clona este repositorio y accede a
la carpeta del proyecto con:

```bash
git clone https://github.com/CentroGeo/sisdai-mapas.git
cd sisdai-mapas
```

Seguido de la instalación de las dependencias y ejecución de vuepress:

```bash
npm install
npm run docs
```
-->

<!-- Se habilitara en [localhost:5173](http://localhost:5173) (por defecto). -->
