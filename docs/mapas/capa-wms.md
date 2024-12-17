# Capa WMS

Componenete para desplegar capas desde servicios wms publicos o privados.

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaWms />
</SisdaiMapa>
```

## Vista general

<VisorCodigo archivo="CapaWms.vue" />

## Propiedades

Hereda las propiedades definidas en la
[sección general de capas](/mapas/capa.html) más las siguientes:

### `capa`

Nombre de la capa en el servidor de mapas.

- Tipo: `String`
- Valor obligatorio: si
- Reactivo: no

### `estilo`

Nombre del estilo disponible para la capa. Al dejar el valor como indefinido,
mostrará el estilo de la capa por defecto que tenga en el servidor.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: si

### `filtro`

Filtro en sintaxis CQL, compatible con la
[Api de Geoserver](https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html).

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: si

### `fuente`

Url fuente del servicio WMS.

- Tipo: `String`
- Valor por defecto: `'https://gema.conahcyt.mx/geoserver/wms'`
- Reactivo: no

### `tipoServidor`

Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o
qgis.

- Tipo: `String`
- Valor por defecto: `geoserver`
- Reactivo: no

<!-- ### `tituloClases`

Titulo de las clases de la leyenda, solo aplica si la capa cuenta con reglas de estilo de clasificación.

- Tipo: `String`.
- Valor por defecto: `undefined`.
- Reactivo: Si. -->
