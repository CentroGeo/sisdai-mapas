# sisdai-mapas

El proyecto sisdai-mapas es una biblioteca visualización de datos geográficos que
forma parte del Sistema de Diseño y Accesibilidad para la
Investigación ([Sisdai](https://sisdai.conahcyt.mx/)). El Sisdai es un proyecto de investigación desarrollado por el
Centro de Investigación en Ciencias de Información Geoespacial, A.C.
([CentroGeo](https://www.centrogeo.org.mx/)) y coordinado por el Consejo Nacional de Humanidades, Ciencias y Tecnologías
([Conahcyt](https://conahcyt.mx)) del Gobierno de México.

Para leer la documentación de la biblioteca, puedes visitar el sitio [sisdai-mapas.conahcyt.mx](https://sisdai-mapas.conahcyt.mx)
o levantar la documentación localmente siguiendo las instrucciones escritas en la sección [Uso local del proyecto](#uso-local-del-proyecto) de este
documento.

Cualquier persona puede hacer uso de esta biblioteca al clonarla e instalarla en su equipo a través del
**protocolo HTTPS** o bien instalándola mediante [npm](https://www.npmjs.com/~centrogeomx).


## Utilidades

- Homologa los estilos utilizando el sistema de diseño [Sisdai](https://sisdai.conahcyt.mx).
- Mejora la accesibilidad mediante el uso de html semántico y aplicando las reglas establecidas en [Sisdai](https://sisdai.conahcyt.mx).
- Facilita la actualización de elementos institucionales requeridos.
- Facilita y reduce el código de elementos para la visualización de datos geográficos.

## Instalación y uso

### Instala la biblioteca

En la carpeta principal de tu proyecto Vue puedes instalar la última versión de sisdai-mapas mediante dos opciones:

**Opción A.** Desde el repositorio del [sisdai-mapas en npm](https://www.npmjs.com/package/@centrogeomx/sisdai-mapas).

En la línea de comando escribe
```bash
npm i @centrogeomx/sisdai-mapas
```

**Opción B.** Desde el repositorio de [sisdai-mapas en código.conahcyt.mx](https://codigo.conahcyt.mx/sisdai/sisdai-mapas).

En la línea de comando escribe
```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-mapas
```

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

_Para un uso avanzado revisa la [documentación](https://sisdai-mapas.conahcyt.mx)._

## Actualización de la biblioteca

Si necesitas utilizar otra versión de sisdai-mapas, ubícate en la carpeta del
proyecto en donde necesitas la actualización e instala la versión que requieres
nuevamente usando una de estas dos opciones

**Opción A.** Para versiones publicadas en el repositorio de [sisdai-mapas en npm](https://www.npmjs.com/package/@centrogeomx/sisdai-mapas).

```bash
npm i @centrogeomx/sisdai-mapas@vN.N.N
```

**Opción B.** Para cualquier versión desde el repositorio de [sisdai-mapas en código.conahcyt.mx](https://codigo.conahcyt.mx/sisdai/sisdai-mapas).

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-mapas#vN.N.N
```

donde N.N.N indica el número de versión, por ejemplo v1.0.0

Consulta el archivo `CHANGELOG.md` del repositorio de [sisdai-mapas en código.conahcyt.mx](https://codigo.conahcyt.mx/sisdai/sisdai-mapas) para conocer las nuevas características y cambios que sufre la biblioteca en cada una de sus versiones.


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
utilizando **sólo el protocolo HTTPS**, es decir:

```bash
git clone https://codigo.conahcyt.mx/sisdai/sisdai-mapas.git
```

Establece la versión adecuada de npm y nvm (previamente instaladas).

```bash
nvm use 22
```

Instala las dependencias de la biblioteca.

```sh
npm install
```

Opcionalmente levanta en local la documentación.

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
