# Capa XYZ

La capa de mosaicos xyz, consume servicios que dentro de su url incluyen el
nivel de zoom y la coordenada x-y de una imagen (mosaico), regularmente se usa
para agregar mapas base.

**Uso:**

```vue{2}
<SisdaiMapa>
  <SisdaiCapaXyz />
</SisdaiMapa>
```

## Vista general

<VisorCodigo archivo="CapaXyz.vue" />

## Propiedades

Hereda las propiedades definidas en la
[sección general de capas](/mapas/capa.html) más las siguientes:

<!-- ### `acercamientoMaximo`

Nivel de acercamiento máximo.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: no

### `acercamientoMinimo`

Nivel de acercamiento mínimo.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: no -->

### `fuente`

Url fuente de la capa.

- Tipo: `String`
- Valor por defecto:
  `https://{a-c}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png`
- Reactivo: no

**Uso:**

```vue
<!-- Fuente: Capa de google -->
<SisdaiCapaXyz fuente="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
```

## Funciones

### `@alIniciarCargaTesela`

Ejecutado cuando se detecta que ha iniciado la carga de cada uno de los mosaicos
que conponen la capa visible en el mapa.

**Uso:**

```vue
<script setup>
function alIniciarCargaTesela() {
  console.log('alIniciarCargaTesela')
}
</script>

<template>
  <SisdaiCapaXyz @alIniciarCargaTesela="alIniciarCargaTesela" />
</template>
```

### `@alFinalizarCargaTesela`

Ejecutado cuando se detecta que ha finalizado la carga de cada uno de los
mosaicos que conponen la capa visible en el mapa.

**Parametros:**

- `Boolean`: Indica si al finalizar la carga del mosaico ha presentado error:
  - `true`: No presentó error al cargar,
  - `false`: Se presentó algún error al cargar.

**Uso:**

```vue
<script setup>
function alFinalizarCargaTesela(cargaExitosa) {
  console.log(
    'alFinalizarCargaTesela:',
    cargaExitosa ? 'Carga exitosa' : 'Problemas al cargar'
  )
}
</script>

<template>
  <SisdaiCapaXyz @alFinalizarCargaTesela="alFinalizarCargaTesela" />
</template>
```
