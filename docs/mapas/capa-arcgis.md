# Capa ArcGIS

Componente para desplegar capas desde servicios de ArcGIS.

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

### `capa`

Nombre de la capa en el servidor de mapas.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: no

### `fuente`

Url fuente del servicio ArcGIS.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: no

**Uso:**

```vue
<!-- Fuente: Servicio de ArcGIS -->
<SisdaiCapaArcgis :fuente="url" />
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
