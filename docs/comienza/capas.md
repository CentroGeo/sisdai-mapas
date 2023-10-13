# Capas

## Propiedades

#### `atribuciones`

Establece las atribuciones de la fuente.

- Tipo: `String` o `Array<String>`
- Valor por defecto: `undefined`
- Reactivo: ❌

#### `id`

Identificador único de la capa. Si no es detectado, se asignará una cadena de texto aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.

- Tipo: `String`
- Valor por defecto: Aleatorio
- Reactivo: ❌

#### `nombre`

Nombre de la capa que aparecerá en el control de la leyenda.

- Tipo: `String`
- Valor por defecto: `'Nombre no asignado'`.
- Reactivo: ✅

#### `opacidad`

Un valor que va de 0 a 1, para indicar la opacidad de la capa. 0 es totalmente invisible y 1 es la opacidad completa.

- Tipo: `Number`
- Valor por defecto: `1`
- Reactivo: ✅

#### `posicion`

Indica la posición respecto a otras capas. Las capas con un valor mayor en este parámetro se mostrarán enfrente.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: ✅

#### `visible`

Visibilidad de la capa.

- Tipo: `Boolean`
- Valor por defecto: `true`
- Reactivo: ✅
