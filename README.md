# sisdai-mapas

El proyecto sisdai-mapas es una biblioteca de visualización de datos geográficos que forma parte del
Sistema de Diseño y Accesibilidad para la Investigación ([Sisdai](https://sisdai.conahcyt.mx)).

Cualquier persona puede hacer uso de esta biblioteca al clonarla e instalarla
en su equipo a través del **protocolo HTTPS**.

## Utilidades

- Homologa los estilos utilizando el sistema de diseño [Sisdai](https://sisdai.conahcyt.mx).
- Mejora la accesibilidad mediante el uso de html semántico y aplicando las reglas establecidas en [Sisdai](https://sisdai.conahcyt.mx).
- Facilita la actualización de elementos institucionales requeridos.
- Facilita y reduce el código de elementos para la visualización de datos geográficos.

## Instalación y uso

### Instala la biblioteca

En la carpeta principal de tu proyecto Vue, instala la biblioteca en las dependencias de tu proyecto con:

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-mapas
```

Dependiendo de la versión de la biblioteca a instalar, las instrucción anterior puede cambiar a:

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-mapas#vN.N.N
```

donde N.N.N indica el número de versión, por ejemplo v1.0.0

### Importa la biblioteca

En el archivo `main.js` de tu proyecto Vue, importa la biblioteca con:

```javascript
// src/main.js
import SisdaiMapas from 'sisdai-mapas'

Vue.use(SisdaiMapas)
```

### Uso

En cualquier vista en la sección `<template>` de tu proyecto puedes utilizar el componente de mapa
sin necesidad de volver a importarlo en el script. Por ejemplo:

```html
<template>
  <SisdaiMapa>
    <SisdaiCapaXyz />
  </SisdaiMapa>
</template>
```

_Para un uso avanzado revisa la [documentación](#documentación)._

## Actualización de la biblioteca

Si actualmente utilizas la biblioteca y necesitas utilizar otra versión de los mapas,
en la carpeta del proyecto instala la versión que requieres nuevamente

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-mapas#vN.N.N
```

donde N.N.N indica el número de versión, por ejemplo v1.0.0

## Listado de elementos del mapa

El componente `SisdaiMapa` es un contenedor especial único que alberga todos los elementos opcionales y requeridos para un mapa interactivo con datos georeferenciados

| Elemento          | Descripción                                                                                                                                                                              |
| ----------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SisdaiCapaGeojson | Las capas vectoriales en geojson nos permiten manipular su información de forma local, esto nos da la posibilidad de pintar sus elementos de forma interactiva, incluso de clasificarlos |
| SisdaiCapaXyz     | La capa de mosaicos xyz, consume servicios que dentro de la url incluyen el nivel de zoom y la coordenada x/y de una imagen (mosaico)                                                    |
| SisdaiCapaWms     | Componente para desplegar capas desde servicios Web Map Service (WMS) públicos o privados.                                                                                               |
| SisdaiMapaLeyenda | Componente de leyenda interactiva vinculada con una capa del mapa                                                                                                                        |

## Uso local del proyecto

### Pasos previos recomendados

Para desarrollar este proyecto se usa [node.js](https://nodejs.org/en) como
entorno de ejecución de JavaScript. La opción recomendada para instalarlo es
[vía nvm](https://github.com/nvm-sh/nvm) que es el manejador de versiones de
node. Siguiendo este camino, también se instalará el manejador de paquetes
[npm](https://www.npmjs.com/). Las instrucciones de instalación
y dependencias del proyecto se muestran aquí usando tanto npm, como nvm.

### Dependencias

- [node.js (^18)](https://nodejs.org/en/download/)
- [npm (^9)](https://www.npmjs.com/get-npm)

### Instalación

Se puede clonar e instalar este proyecto en tu equipo
utilizando **solo el protocolo HTTPS**, es decir:

```bash
git clone https://codigo.conahcyt.mx/sisdai/sisdai-mapas.git
```

Establece la versión adecuada de npm y nvm (previamente instaladas).

```bash
nvm use 18
```

Instala las dependencias de la biblioteca.

```sh
npm install
```

### Documentación

Este proyecto cuenta con una documentación más extensa que aún está
en proceso de desarrollo. Es posible levantarla en un ambiente local con la
instrucción:

```bash
npm run docs
```

## Licencia

**SOFTWARE LIBRE Y ESTÁNDARES ABIERTOS**

Sisdai y sisdai-mapas están alineadas a las disposiciones establecidas por
la Coordinación de Estrategia Digital Nacional (
DOF:06/09/2021) en donde se estipula que las "políticas y disposiciones tienen
como objetivo fortalecer el uso del software
libre y los estándares abiertos, fomentar el desarrollo de aplicaciones
institucionales con utilidad pública, lograr la
autonomía, soberanía e independencia tecnológicas dentro de la APF". En el
artículo 63 se explicita que "cuando se trate
de desarrollos basados en software libre, se respetarán las condiciones de su
licenciamiento original [...]".

Considerando lo anterior, sisdai-mapas se publica bajo la licencia
[LGPLv3](https://www.gnu.org/licenses/lgpl-3.0.html). Dicha licencia se puede
consultar en el archivo _LICENSE_ de este repositorio.
Esta licencia se encuentra disponible en inglés porque aunque el Sisdai privilegia
el idioma español se respeta la versión original de acuerdo al proyecto
[GNU](https://www.gnu.org/licenses/licenses.html).

## Contribuir

Por el momento sólo quienes sean parte de un equipo de investigación del
capítulo de un ENI podrán levantar issues en este repositorio. El equipo del
Sisdai se encargará de mantenerlo.
