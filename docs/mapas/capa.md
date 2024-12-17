# Capas

Las siguientes propiedades, eventos y funciones son heredadas a todas las capas
disponibles en esta biblioteca.

## Propiedades

### `atribuciones`

Establece las atribuciones de la fuente.

- Tipo: `String` o `Array<String>`
- Valor por defecto: `undefined`
- Reactivo: no

### `id`

Identificador único de la capa. Si no es detectado, se asignará una cadena de
texto aleatorea. Para hacer uso de la [leyenda vinculada](/mapas/leyenda.html)
esta propiedad pasa a ser obligatoria en capas
[vectoriales](/mapas/capa-vectorial.html) y [xyz](/mapas/capa-xyz.html), para el
caso de capas [wms](/mapas/capa-wms.html) si no es definida se usará el valor
`capa`.

- Tipo: `String`
- Valor por defecto: Aleatorio
- Reactivo: no

### `opacidad`

Un valor que va de 0 a 1, para indicar la opacidad de la capa. 0 es totalmente
invisible y 1 es la opacidad completa.

- Tipo: `Number` o `String`
- Valor por defecto: `1`
- Reactivo: si

### `posicion`

Indica la posición respecto a otras capas. Las capas con un valor mayor en este
parámetro se mostrarán enfrente.

- Tipo: `Number` o `String`
- Valor por defecto: `undefined`
- Reactivo: si

### `titulo`

Titulo de la capa que aparecerá en el control de la leyenda.

- Tipo: `String`
- Valor por defecto: `'Titulo no asignado'`.
- Reactivo: si

### `visible`

Visibilidad de la capa.

- Tipo: `Boolean`
- Valor por defecto: `true`
- Reactivo: si

## Eventos

<!-- ## Funciones -->
