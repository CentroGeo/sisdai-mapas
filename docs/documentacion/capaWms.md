<script setup>
import CapaWms from "./../.vitepress/ejemplos/CapaWms.vue";
</script>

# Capa WMS

Componenete para desplegar capas desde servicios wms publicos o privados.

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaWms />
</SisdaiMapa>
```

## Propiedades

Hereda las propiedades definidas en la sección Capas más las siguientes:

Hereda las propiedades definidas en la sección Capas más las siguientes:

#### `capa`

Nombre de la capa en el servidor de mapas.

- Tipo: `String`.
- Valor **obligatorio**.
- Reactivo: No.

#### `estilo`

Nombre del estilo disponible para la capa. Al dejar el valor como indefinido,
mostrará el estilo de la capa por defecto que tenga en el servidor.

- Tipo: `String`.
- Valor por defecto: `undefined`.
- Reactivo: Si.

#### `filtro`

Filtro en sintaxis CQL, compatible con la
[Api de Geoserver](https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html).

- Tipo: `String`.
- Valor por defecto: `undefined`.
- Reactivo: Si.

#### `tipoServidor`

Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o
qgis.

- Tipo: `String`.
- Valor por defecto: `geoserver`.
- Reactivo: No.

#### `url`

URL del servicio WMS.

- Tipo: `String`.
- Valor por defecto: `'https://gema.conahcyt.mx/geoserver/wms'`.
- Reactivo: No.

<!-- #### `tituloClases`

Titulo de las clases de la leyenda, solo aplica si la capa cuenta con reglas de estilo de clasificación.

- Tipo: `String`.
- Valor por defecto: `undefined`.
- Reactivo: Si. -->

## Ejemplo

<CapaWms />

<<< @/.vitepress/ejemplos/CapaWms.vue{10-17}
