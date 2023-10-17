# sisdai-mapas

Componentes de software libre para el Sistema de Diseño y Accesibilidad para
la Investigación ([Sisdai](https://sisdai.conahcyt.mx)).

> **_Limitación de responsabilidad_**
>
> El presente es un proyecto en construcción, por tanto el equipo del Sisdai
> no es responsable del uso y contenido del presente recurso,
> toda vez que se trata de una versión en su modalidad prueba, y no de una
> versión liberada al público, por lo que una vez que sea lanzada la versión
> final,
> se invita a la persona usuaria a consultarla y validar sus requisitos.

## Como empezar a usar el componente en un proyecto de Vue.js

### Instalación

Instalación y descarga de la biblioteca desde GitHub:

```bash
npm i git+https://codigo.conahcyt.mx/sisdai/sisdai-mapas#version-a-instalar
```

### Importación y registro

En el archivo que se desee utilizar el componente:

```javascript
import Vue from 'vue'
import SisdaiMapas from 'sisdai-mapas'

Vue.use(SisdaiMapas)
```

Si se utiliza el componente sisdai-mapas en dos archivos o más, se recomienda
registrar el componente en el archivo `src/main.js` del proyecto.

### Crear un mapa básico

Dentro del componente en el que se desee crear mapas con el diseño sisdai, usa
la etiqueta `SisdaiMapa` dentro del `template` del HTML y agrega las capas y
directivas que necesites:

```html
<SisdaiMapa>
  <SisdaiCapaXyz />
</SisdaiMapa>
```

Para un uso avanzado revisa la documentación.

## Documentación en local

Para revisar la documentación en local primero clona este repositorio y accede a
la carpeta del proyecto con:

```bash
git clone https://codigo.conahcyt.mx/sisdai/sisdai-mapas
cd sisdai-mapas
```

Seguido de la instalación de las dependencias y ejecución de vitepress:

```bash
npm install
npm run docs
```

Se habilitara en [localhost:5173](localhost:5173).

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

## Contribuir

Para contribuir al proyecto, se pide que se haga tomando en cuenta la guía de
contribución
de [git](https://git-scm.com/book/es/v2/Git-en-entornos-distribuidos-Contribuyendo-a-un-Proyecto)
.
