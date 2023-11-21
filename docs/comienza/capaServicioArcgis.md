<script setup>
import CapasServicioArcgis from "./../.vitepress/components/capas/ServicioArcgis.vue";
</script>

# Capa Servicio ArcGIS

Componenete para desplegar capas desde servicios de ArcGIS.

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaServicioArcgis />
</SisdaiMapa>
```

## Propiedades

Hereda las propiedades definidas en la sección Capas más las siguientes:

#### `url`

URL del servicio ArcGIS.

- Tipo: `String`
- Valor por defecto: `undefined`.
- Reactivo: ❌

## Ejemplo

<CapasServicioArcgis />

<<< @/.vitepress/components/capas/ServicioArcgis.vue
