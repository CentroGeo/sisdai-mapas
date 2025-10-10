# Leyendas Wms

Leyenda para visualizar la simbología de [capas wms](/mapas/capa-wms.html).

**Uso:**

```vue
<SisdaiLeyendaWms />
```

<div class="nota-contenedor">
  <p class="nota-titulo">Importante:</p>
  <p class="nota">
    Para vincular la leyenda con las capas del mapa de forma automática se debe utiliuzar el componente <a href="/mapas/leyenda.html">SisdaiLeyenda</a>.
  </p>
</div>

## Vista general

<VisorCodigo archivo="LeyendaWms.vue" />

<!-- ## Propiedades

### `` -->

## Eventos

A continuación se describen los eventos que desencadenan las leyendas.

### `@alIniciarCargaSimbologia`

Ejecutado cuando se detecta que ha iniciado la carga de la simbología de la
información de la capa. En el caso de capas vectoriales (GeoJSON o TopoJSON)
inicia la lectura de los estilos de los features; En el caso de capas (WMS)
cuando inicia la consulta de las reglas de estilo vía `GetLegendGraphic` en
formato JSON; En el caso de las capas por conjunto de teselas (XYZ) no se
ejecuta.

**Uso:**

```vue
<script setup>
function alIniciarCargaSimbologia() {
  console.log('alIniciarCargaSimbologia')
}
</script>

<template>
  <SisdaiLeyendaWms @alIniciarCargaSimbologia="alIniciarCargaSimbologia" />
</template>
```

### `@alFinalizarCargaSimbologia`

Ejecutado cuando se detecta que ha finalizado la carga de la simbología de la
información de la capa. En el caso de capas vectoriales (GeoJSON o TopoJSON)
finaliza la lectura de los estilos de los features; En el caso de capas (WMS)
cuando finaliza la consulta de las reglas de estilo vía `GetLegendGraphic` en
formato JSON; En el caso de las capas por conjunto de teselas (XYZ) no se
ejecuta.

**Parámetros:**

- `Boolean`: Indica si al finalizar la carga de la simbología ha presentado
  error:
  - `true`: No presentó error al cargar,
  - `false`: Se presentó algún error al cargar.

**Uso:**

```vue
<script setup>
function alFinalizarCargaSimbologia(cargaExitosa) {
  console.log(
    'alFinalizarCargaSimbologia:',
    cargaExitosa ? 'Carga exitosa' : 'Problemas al cargar'
  )
}
</script>

<template>
  <SisdaiLeyendaWms @alFinalizarCargaSimbologia="alFinalizarCargaSimbologia" />
</template>
```
