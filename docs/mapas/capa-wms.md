<script setup>
import CapaWms from "./../.vitepress/ejemplos/CapaWms.vue";
</script>

# Capa WMS

Componenete para desplegar capas desde servicios wms publicos o privados.

## Vista general

<CapaWms />

<<< @/.vitepress/ejemplos/CapaWms.vue{10-17}

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaWms />
</SisdaiMapa>
```

## Propiedades

Hereda las propiedades definidas en la [sección capas](/mapas/capas.html) más
las siguientes:

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

### `tipoServidor`

Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o
qgis.

- Tipo: `String`
- Valor por defecto: `geoserver`
- Reactivo: no

### `url`

URL del servicio WMS.

- Tipo: `String`
- Valor por defecto: `'https://gema.conahcyt.mx/geoserver/wms'`
- Reactivo: no

<!-- ### `tituloClases`

Titulo de las clases de la leyenda, solo aplica si la capa cuenta con reglas de estilo de clasificación.

- Tipo: `String`.
- Valor por defecto: `undefined`.
- Reactivo: Si. -->
