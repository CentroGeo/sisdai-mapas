# Changelog

Todos los cambios más importantes de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.1.0)
y este proyecto se adhiere al [Versionamiento semántico](https://semver.org/spec/v2.0.0.html).

\*Nota: Este Changelog se comenzó el 2024-10-28. Se documentaron hacia atrás los cambios más relevantes
de la biblioteca. Por lo tanto no se listan aquí todos los tags existentes.

Al principio de cada entrada se lista la versión de la biblioteca de sisdai-css y
sisdai-componentes con la que la versión indicada de sisdai-mapas es
compatible y tiene instalada.

## [Unreleased]

sisdai-css v1.3.3<br>sisdai-componentes v4.1.6

### Cambiado (Changed)

- Posición del globo de información desde inject
- Actualización del componente de capa vectorial
- Actualización del componente WMS
- Optimización de controles

### Agregado (Added)

- Preliminar de animación al cargar

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

[unreleased]: https://codigo.conahcyt.mx/sisdai/sisdai-mapas/-/tree/feature/test-unit/
[1.11.9]: https://codigo.conahcyt.mx/sisdai/sisdai-mapas/compare/v1.11.9...v1.0.0
[1.0.0]: https://codigo.conahcyt.mx/sisdai/sisdai-mapas/-/releases/v1.0.0
