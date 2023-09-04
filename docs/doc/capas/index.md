# Generalidades

Aquí se describen las propiedades y eventos generales que tienen todas las capas que se pueden registrar en este componente.

- SisdaiCapaGeojson
- SisdaiCapaXyz
- SisdaiCapaWms

## Propiedades

#### `id`

- Tipo: `String`
- Valor por defecto: Se asignará una cadena de texto aleatorea.
- Interactivo: ❌

Identificador único de la capa. Si no es detectado, se asignará una cadena de texto aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.

#### `nombre`

- Tipo: `String`
- Valor por defecto: Identificador único de la capa.
- Interactivo: ✅

Nombre de la capa que aparecerá en el control de la leyenda. Si no es detectado, se asignará el identificador único de la capa (`id`).

#### `verCargador`

- Tipo: `Boolean`
- Valor por defecto: `false`
- Interactivo: ❌

Esta propiedad le comunica a la vista del mapa si se desea sobreponer la vista que indica el proceso de carga de una capa.

#### `visible`

- Tipo: `Boolean`
- Valor por defecto: `true`
- Interactivo: ✅

Visibilidad de la capa.

#### `zIndex`

- Tipo: `Number`
- Valor por defecto: `undefined`
- Interactivo: ✅

Indica la posición respecto a otras capas, cuando se define un z-index mas alto respecto a las demás capas, esa capa se posicionara enfrente de ellas.

#### `extension`

- Tipo: `Array`
- Valor por defecto: `[0, 0, 0, 0]`
- Interactivo: ❌

Extensión de la capa. Con este parametro se calcularán los mínimos y máximos de las capas registradas en el mapa.

## Eventos

#### `@alCambiarVisibilidad`

Evento ejecutado cuando se detecta el cambio de visibilidad de la capa desde las propiedades reactivas o desde los controles del componente como el control de leyenda.

Parámetros esperados:

- visibilidad: `Boolean` Visibilidad final al ejecutarse este evento.

#### `@alIniciarCarga`

Evento ejecutado cuando se detecta que ha iniciado la carga de la información visible en el mapa. En el caso de capas vectoriales (GeoJSON) cuando inicia la consulta de los features; En el caso de capas raster (WMS) cuando inicia la consulta de la imagen; En el caso de las capas por conjunto de teselas (XYZ, OSM) cuando inicia la consulta de un grupo de teselas.

Sin parámetros esperados.

#### `@alFinalizarCarga`

Evento ejecutado cuando se detecta que ha finalizado la carga de la información visible en el mapa. En el caso de capas vectoriales (GeoJSON) cuando finaliza la consulta de los features; En el caso de capas raster (WMS) cuando finaliza la consulta de la imagen; En el caso de las capas por conjunto de teselas (XYZ, OSM) cuando finaliza la consulta de un grupo de teselas.

Parámetros esperados:

- cargaExitosa: `Boolean` Indica si la carga no ha presentado error.
