# sisdai-mapas

Componentes de software libre para el Sistema de Diseño y Accesibilidad para
la Investigación ([Sisdai](https://sisdai.conahcyt.mx)).

Cualquier persona puede hacer uso de esta biblioteca al clonarla e instalarla
en su equipo a través del **protocolo HTTPS**.

## Requerimientos

### Pasos previos recomendados

Para desarrollar este proyecto se usó [node.js](https://nodejs.org/en) como
entorno de ejecución de JavaScript. La opción recomendada para instalarlo es
[vía nvm](https://github.com/nvm-sh/nvm) que es el manejador de versiones de
node. Siguiendo este camino, también se instalará el manejador de paquetes
[npm](https://www.npmjs.com/). Dado lo anterior las instrucciones de instalación
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

```bash
npm install
```

En cambio si se quiere instalar esta biblioteca para su uso en otro proyecto se puede hacer:

``` bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-componentes
```

Dependiendo de la versión de la biblioteca a instalar, las instrucción anterior puede cambiar a:
``` bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-componentes#vN.N.N
```
donde N.N.N indica el número de versión, por ejemplo v1.0.0

Así mismo también se puede agregar la biblioteca en el archio `package.json` de otro 
proyecto.

## Uso de la biblioteca

### Importación y registro

En el archivo que se desee utilizar el componente se agrega:

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
<SisdaiMapa
  :zoom="2"
  :centro="0,0"
>
  <SisdaiCapaXyzOsm />
</SisdaiMapa>
```

Para un uso avanzado revisa la documentación.

## Documentación

Este proyecto cuenta con una documentación más extensa que aún está
en proceso de desarrollo. Es posible levantarla en un ambiente local con la
instrucción:


```bash
npm run docs:serve
```


## Licencia

**SOFTWARE LIBRE Y ESTÁNDARES ABIERTOS**

Sisdai y sisdai-componentes están alineadas a las disposiciones establecidas por
la Coordinación de Estrategia Digital Nacional (
DOF:06/09/2021) en donde se estipula que las "políticas y disposiciones tienen
como objetivo fortalecer el uso del software
libre y los estándares abiertos, fomentar el desarrollo de aplicaciones
institucionales con utilidad pública, lograr la
autonomía, soberanía e independencia tecnológicas dentro de la APF". En el
artículo 63 se explicita que "cuando se trate
de desarrollos basados en software libre, se respetarán las condiciones de su
licenciamiento original [...]".

Considerando lo anterior sisdai-componentes se publica bajo la licencia
[GPL3](https://www.gnu.org/licenses/gpl-3.0.html). Dicha licencia se puede
consultar en el archivo _LICENSE_ de este repositorio.
Esta licencia se encuentra disponible en inglés porque aunque el Sisdai privilegia
el idioma español se respeta la versión original de acuerdo al proyecto
[GNU](https://www.gnu.org/licenses/licenses.html).

## Contribuir

Por el momento sólo quienes sean
parte de un equipo de investigación del capítulo de un [ENI](https://eni.conahcyt.mx)
podrán levantar issues en este repositorio.