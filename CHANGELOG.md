# Changelog

Todos los cambios más importantes de este proyecto se documentan en este
archivo.

El formato está basado en
[Keep a Changelog](https://keepachangelog.com/en/1.1.0) y este proyecto se
adhiere al [Versionamiento semántico](https://semver.org/spec/v2.0.0.html).

\*Nota: Este Changelog se comenzó el 2024-10-28. Se documentaron hacia atrás los
cambios más relevantes de la biblioteca. Por lo tanto no se listan aquí todos
los tags existentes.

Al principio de cada entrada se lista la versión de la biblioteca de sisdai-css
y sisdai-componentes con la que la versión indicada de sisdai-mapas es
compatible y tiene instalada.

<!-- ## [Unreleased] -->

## [2.3.2] - 2026-01-04

### Cambiado (Changed)

- **Ref mapa**: Se expone la instancia del mapa dentro de un objeto para que
  pueda ser usado con ref en las veriones recientes de Vue.
- **Globo informativo**: Modificación en la importación del componente de globo
  de información en capas vectoriales.

### Eliminado (Removed)

- **Logo atribuciones**: El logo en el apartado de atribuciones ya no está
  disponible en remoto.

## [2.3.1] - 2025-11-21

### Cambiado (Changed)

- **Mapa dividido**:
  - Se corrigieron las reglas css para que tenga los mismos estilos en
    navegadores basados en chromium.
- **Cuadro de información**:
  - Permite tener el contenido de más de una capa wms en un mismo cuadro de
    información.
  - Permite la ejecución de funciones asíncronas en el cuadro de información
    para wms.
  - Separa el contenido de las capas con `<hr />`
  - El listado del contenido de las capas se define con la propiedad `posicion`
    de la capa.
- **Actualización de Openlayers**:
  - De 10.6.1 a 10.7.0

## [2.3.0] - 2025-10-10

### Agregado (Added)

- **Vista dividida / Swipe**:
  - Control tipo `input range` sobre el mapa para dividir la vista (split view).
  - Integración de **capa deslizada (swipe)**.
  - Propiedad reactiva `lado` en capas para definir su posición en la división.
  - Documentación de uso.
- **WMS**:
  - Importación y ciclo de vida (`onMounted` / `onUnmounted`) de capas WMS.
  - Habilitación de **eventos** en capa WMS.
  - **Reactividad** de la posición de capas WMS.
  - **Opacidad** en capas WMS.
  - `getFeatureInfo`: **validación** de `feature`.
  - Manejo de **`crossOrigin`**.
  - Uso correcto de `map.getView()` en `alMoverVista`.
  - **Consulta**: Nuevo **parámetro `consulta`** para controlar el `fetch` de la
    consulta del servicio (leyenda y/o getFeatureInfo).
- **Capas**:
  - **Composable** para acciones repetidas en capas.

### Cambiado (Changed)

- **Dependencias**:
  - Actualización general de dependencias.
  - Ajuste del **formato de la URL** de la dependencia `sisdai-css` (Git URL →
    https/npm).
  - `sisdai-css` ahora se importa **desde npm/https**.
- **WMS**:
  - Modificación de **importación de clases** WMS.
  - **Cuadro de información**:
    - Propiedad `cuadroInformativo` con reactividad.
    - Parámetros de **URL** y **contenido** configurables desde la propiedad del
      cuadro.
    - **Delimitación** del cuadro informativo solo para las capas WMS que lo
      soliciten.
    - **Evento** al dar click en el **botón de centrar**.
- **XYZ**:
  - Refactor: **opacidad**, **posición** y **visible** en capa XYZ.
  - Movimiento (cursor y botones) y ciclo de vida (`onMounted` / `onUnmounted`)
    en capa XYZ.
- **Vectorial**:
  - **Parámetros reactivos** en capa vectorial.
- **CSS**:
  - Actualización de la importación de **sisdai-css**.

### Eliminado (Removed)

- Se quitó la dependencia `axios`

## [2.1.0] - 2025-03-27

### Cambiado (Changed)

- Se actualizaron las versiones y archivos de configuración de las bibliotecas
  requeridas tanto para el proyecto como para la documentación y pruebas.

## [2.0.1] - 2024-12-17

### Cambiado (Changed)

- Detalles en titulos de la documentación
- Redacción en representación de puntos agrupados
- Redacción en representación de puntos desplazados
- Redacción en estilos de símbolos graduados

## [2.0.0] - 2024-12-16

### Cambiado (Changed)

- Uso de bibliotecas `vue`, `@centrogeomx/sisdai-componentes`,
  `@centrogeomx/sisdai-css` y `axios` como `peerDependencies` para evitar
  instalación duplicada.
- Cambio de nombre en parametro `url` de capa Wms por `fuente`.
- Cambio de nombre en parametro `url` de capa Xyz por `fuente`.
- Separación de la propieda `parametros="{ LAYERS, STYLES, CQL_FILTER }"` en
  capas wms por propiedades `capa`, `estilo` y `filtro` respectivamente
- Propiedad de `nombre` en capas pasa a llamarse `titulo`
- SisdaiLeyendaWmsExterna por Leyenda Wms separada (SisdaiLeyendaWms)
- Posición del globo de información desde inject
- Actualización del componente de capa vectorial
- Actualización del componente WMS
- Optimización de controles
- Adecuanciones en documentación con identidad del Gobierno de México para el
  periodo 2024-2030
- Actualización de dependencia
  [ol-displaced-points](https://www.npmjs.com/package/ol-displaced-points) para
  la representación de puntos desplazados
- Uso de estilos dentro de componentes que evita errores con la importación de
  sass

### Agregado (Added)

- Estilo con posibiliad de categorización en capas vectoriales
- Representación de puntos desplazados
- Leyenda Vectorial separada (SisdaiLeyendaVectorial)
- Animación al cargar
- Dependencia
  [geoserver-api-reader](https://www.npmjs.com/package/geoserver-api-reader)
  para el manejo de leyendas wms

## [1.13.6] - 2024-12-16

### Cambiado (Changed)

- Se homologa ancho de contenedor de sección _Otras bibliotecas Sisdai_ en el
  Inicio
- Se actualizan versiones de css y componentes

## [1.13.3] - 2024-11-21

### Cambiado (Changed)

- El nombre del proyecto en el `package.json` pasa a ser
  @centrogeomx/sisdai-mapas para su publicación en el repositorio de npm
- Se ajusta documentación de acuerdo a lo anterior

## [1.13.2] - 2024-11-19

### Arreglado (Fixed)

- Ya se muestra la información de despliegue en el ambiente de desarrollo y no
  en el ambiente de producción

### Eliminado (Removed)

- Contribución a proyectos que mencionaba SALSA

## [1.13.0] - 2024-11-06

### Agregado (Added)

- vue-matomo para seguir las analíticas del sitio

## [1.12.1] - 2024-11-06

### Cambiado (Changed)

- Se oculta vista de inicio para homologar con sisdai-componentes y
  sisdai-graficas
- Posición y estilo del enlace externo _IR A SISDAI_

### Eliminado (Removed)

- Se quita aviso de documentación en construcción ya que no es relevante para
  las personas desarrolladoras usuarias de esta biblioteca

## [1.12.0] - 2024-11-04

### Cambiado (Changed)

- Actualización de sisdai-css a v1.3.3
- Actualización de sisdai-componentes a v4.1.6

### Agregado (Changed)

- Se agrega aviso de que la documentación se encuentra en una versión beta

## [1.11.9] - 2024-09-25

sisdai-css v1.2.4<br>sisdai-componentes v4.0.0-beta.11

### Cambiado (Changed)

- Ajustes de accesibilidad en elementos interactivos
- Correcciones en la documentación

### Agregado (Added)

- Capa vectorial en formato TopoJSON
- Eventos al cambiar visibilidad en capa WMS
- Leyenda wms conectada con filtros
- Instruccional de navegación por teclado
- Parámetro de leyenda "sinControl"
- Leyenda con simbología de clasificaciones
- Ejemplos de estilos vectoriales

### Removido (Removed)

- Dependencia svgson (inestable en algunos ambientes)

## [1.0.0] - 2023-09-03

sisdai-css v0.31.2

### Cambiado (Changed)

- Refactorización de Layout
- Actualización de dependencias

### Agregado (Added)

- Instalación de sisdai-css
- Vitepress
- Eventos en capa vectorial
- Propiedades interactivas generales de capas
- Composable de capa usado en xyz
- Composable de capa usado en capa WMS
- Composable de capas
- Escala gráfica reactiva
- Control de atribución
- Ejemplo de Gema usando slots de paneles
- Composable registro de mapas
- Vinculación de nombre reactivo en leyenda
- Vinculación de capas sin `getCurrentInstance`
- Leyenda y capas WMS como arreglo
- Validaciones de la propiedad vista: centro y zoom
- Validaciones de la propiedad vista: extensión
- Validación de extensión
- Validación de arreglos sin nullos
- Habilitación de descarga de la imágen
- SisdaiCapaXyz
- Eventos de carga en capa WMS
- Eventos de carga en capa xyz
- Componente de contenedores
- Ejemplo de Gema con contenedor

[2.3.0]: https://github.com/CentroGeo/sisdai-mapas/compare/v2.2.0...v2.2.0
[2.1.0]: https://github.com/CentroGeo/sisdai-mapas/compare/v2.1.0...v2.0.1
[1.13.6]:
  https://codigo.conahcyt.mx/sisdai/sisdai-mapas/compare/v1.13.6...v1.13.3
[1.13.3]:
  https://codigo.conahcyt.mx/sisdai/sisdai-mapas/compare/v1.13.3...v1.13.0
[1.13.0]:
  https://codigo.conahcyt.mx/sisdai/sisdai-mapas/compare/v1.13.0...v1.12.1
[1.12.1]:
  https://codigo.conahcyt.mx/sisdai/sisdai-mapas/compare/v1.12.1...v1.12.0
[1.12.0]:
  https://codigo.conahcyt.mx/sisdai/sisdai-mapas/compare/v1.12.0...v1.11.9
[1.11.9]:
  https://codigo.conahcyt.mx/sisdai/sisdai-mapas/compare/v1.11.9...v1.0.0
[1.0.0]: https://codigo.conahcyt.mx/sisdai/sisdai-mapas/-/releases/v1.0.0
