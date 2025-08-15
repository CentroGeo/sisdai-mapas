# Capas

Las siguientes propiedades, eventos y funciones son heredadas a todas las capas
disponibles en esta biblioteca.

## Propiedades

A continuación se describen las propiedades con las que cuentan las capas.

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

**Uso:**

```vue
<!-- Capa con opacidad al 50%  -->
<SisdaiCapa* :opacidad="0.5" />
<!-- *: Vectorial, Wms o Xyz -->
```

### `posicion`

Indica la posición respecto a otras capas. Las capas con un valor mayor en este
parámetro se mostrarán enfrente.

- Tipo: `Number` o `String`
- Valor por defecto: `undefined`
- Reactivo: si

**Uso:**

```vue
<!-- Capa en posición 2 -->
<SisdaiCapa* :posicion="2" />
<!-- *: Vectorial, Wms o Xyz -->
```

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

**Uso:**

```vue
<!-- Capa no visible -->
<SisdaiCapa* :visible="false" />
<!-- *: Vectorial, Wms o Xyz -->
```

## Eventos

A continuación se describen los eventos que desencadenan las capas.

### `@alIniciarCarga`

Evento ejecutado cuando se detecta que ha iniciado la carga de la información
visible en el mapa. En el caso de capas vectoriales (GeoJSON) cuando inicia la
consulta de los features; En el caso de capas raster (WMS) cuando inicia la
consulta de la imagen; En el caso de las capas por conjunto de teselas (XYZ,
OSM) cuando inicia la consulta de un grupo de teselas.

**Uso:**

```vue
<script setup>
function alIniciarCarga() {
  console.log('alIniciarCarga')
}
</script>

<template>
  <SisdaiCapa* @alIniciarCarga="alIniciarCarga" />
</template>
<!-- *: Vectorial, Wms o Xyz -->
```

### `@alFinalizarCarga`

Evento ejecutado cuando se detecta que ha finalizado la carga de la información
visible en el mapa. En el caso de capas vectoriales (GeoJSON) cuando finaliza la
consulta de los features; En el caso de capas raster (WMS) cuando finaliza la
consulta de la imagen; En el caso de las capas por conjunto de teselas (XYZ,
OSM) cuando finaliza la consulta de un grupo de teselas.

**Parámetros:**

- `Boolean`: Indica si al finalizar la carga de la capa ha presentado error:
  - `true`: No presentó error al cargar,
  - `false`: Se presentó algún error al cargar.

**Uso:**

```vue
<script setup>
function alFinalizarCarga(cargaExitosa) {
  console.log(
    'alFinalizarCarga:',
    cargaExitosa ? 'Carga exitosa' : 'Problemas al cargar'
  )
}
</script>

<template>
  <SisdaiCapa* @alFinalizarCarga="alFinalizarCarga" />
</template>
<!-- *: Vectorial, Wms o Xyz -->
```

<!-- ## Funciones -->
