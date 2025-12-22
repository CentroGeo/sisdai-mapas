# Capa Arcgis

Componente para desplegar capas desde servicios de arcgis.

**Uso:**

```vue{2}
<SisdaiMapa>
  <SisdaiCapaArcgis />
</SisdaiMapa>
```

## Vista general

<VisorCodigo archivo="CapaArcgis.vue" />

## Propiedades

Hereda las propiedades definidas en la
[sección general de capas](/mapas/capa.html) más las siguientes:

### `fuente`

Url fuente del servicio WMS.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: no

**Uso:**

```vue
<!-- Fuente: Capas wms de gema -->
<SisdaiCapaArcgis fuente="https://gema.conahcyt.mx/geoserver/wms" />
```

### `mosaicos`

Establece si la consulta de la capa será por mosaicos o teselas. Cuando el valor
es falso la carga será de una sola imagen.

- Tipo: `Boolean`
- Valor por defecto: `false`
- Reactivo: no

**Uso:**

```vue
<!-- Mosaicos: true -->
<SisdaiCapaArcgis :mosaicos="true" />
```
