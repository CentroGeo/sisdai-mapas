# Leyenda vinculada

Utiliza el componente de leyenda para vincular un control de visibilidad de las
capas que se encuentran definidas en el mapa. Este componente también permite
visualizar la simbología de las capas [vectoriales](/mapas/capa-vectorial.html)
y [wms](/mapas/capa-wms.html).

**Uso:**

```vue
<SisdaiMapa>
  <template #panel-?-vis>
    <SisdaiLeyenda para="<String(id de la capa)>" />
  </template>
</SisdaiMapa>
```

## Vista general

<VisorCodigo archivo="LeyendaVinculada.vue" />

## Propiedades

### `para`

Recibe el identificador de la capa con la que se quiere vincular la leyenda.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: Si.

### `sinControl`

Define si se agrega el control (input) en el titulo de la leyenda. El control se
vincula con la visibilidad de la capa.

- Tipo: `Boolean`
- Valor por defecto: `false`
- Reactivo: Si.

## Eventos

A continuación se describen los eventos que desencadenan las leyendas.

### `@alIniciarCargaSimbologia`

Ejecutado cuando se detecta que ha iniciado la carga de la simbología de la
información de la capa. En el caso de capas vectoriales (GeoJSON o TopoJSON)
inicia la lectura de los estilos de los features; En el caso de capas (WMS)
cuando inicia la consulta de las reglas de estilo vía `GetLegendGraphic` en
formato JSON; En el caso de las capas por conjunto de teselas (XYZ) no se
ejecuta.

### `@alFinalizarCargaSimbologia`

Ejecutado cuando se detecta que ha finalizado la carga de la simbología de la
información de la capa. En el caso de capas vectoriales (GeoJSON o TopoJSON)
finaliza la lectura de los estilos de los features; En el caso de capas (WMS)
cuando finaliza la consulta de las reglas de estilo vía `GetLegendGraphic` en
formato JSON; En el caso de las capas por conjunto de teselas (XYZ) no se
ejecuta.

**Parámetros:**

- `Boolean`: Indica si la carga no ha presentado error.
