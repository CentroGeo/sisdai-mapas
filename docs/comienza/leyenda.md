<script setup>
import ResaAtoyac from "./../.vitepress/components/usos/atoyac.vue";
</script>

# Leyendas

Uso:

```vue
<SisdaiLeyenda para="<String(id de la capa)>"></SisdaiLeyenda>
```

## Propiedades

#### `para`

## Eventos

A continuación se describen los eventos que desencadenan las leyendas.

#### `@alIniciarCargaSimbologia`

Ejecutado cuando se detecta que ha iniciado la carga de la simbología de la información de la capa. En el caso de capas vectoriales (GeoJSON o TopoJSON) inicia la lectura de los estilos de los features; En el caso de capas (WMS) cuando inicia la consulta de las reglas de estilo vía `GetLegendGraphic` en formato JSON; En el caso de las capas por conjunto de teselas (XYZ) no se ejecuta.

#### `@alFinalizarCargaSimbologia`

Ejecutado cuando se detecta que ha finalizado la carga de la simbología de la información de la capa. En el caso de capas vectoriales (GeoJSON o TopoJSON) finaliza la lectura de los estilos de los features; En el caso de capas (WMS) cuando finaliza la consulta de las reglas de estilo vía `GetLegendGraphic` en formato JSON; En el caso de las capas por conjunto de teselas (XYZ) no se ejecuta.

**Parámetros:**

- `Boolean`: Indica si la carga no ha presentado error.

Uso avanzado:

```vue
<SisdaiLeyenda
  v-for="capa in capas"
  :para="capa.nombre"
  :tipo="capa.tipo"
  grupo="grupoParaRadios"
></SisdaiLeyenda>
```

## Ejemplo

<ResaAtoyac />

<<< @/.vitepress/components/usos/atoyac.vue
