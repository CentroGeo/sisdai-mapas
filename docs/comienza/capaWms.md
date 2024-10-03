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

#### `parametros`

Parámetros de solicitud WMS. El atributo LAYERS (nombre de las capas separadas por comas) es obligatorio. Para revisar los valores por defecto consulte el [modulo WMS de OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_source_wms.html).

- Tipo: `Object`.
- Valor por defecto: `{}`.
- Reactivo: Si.

#### `tipoServidor`

Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o qgis.

- Tipo: `String`.
- Valor por defecto: `geoserver`.
- Reactivo: No.

#### `url`

URL del servicio WMS.

- Tipo: `String`
- Valor por defecto: `undefined`.
- Reactivo: No

#### `tituloClases`

Titulo de las clases de la leyenda, solo aplica si la capa cuenta con reglas de estilo de clasificación.

- Tipo: `String`.
- Valor por defecto: `undefined`.
- Reactivo: Si.

## Ejemplo

<CapaWms />

<<< @/.vitepress/ejemplos/CapaWms.vue
