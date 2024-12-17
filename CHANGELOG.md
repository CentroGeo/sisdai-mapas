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

## [2.0.0] - 2024-12-12

### Cambiado (Changed)

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
