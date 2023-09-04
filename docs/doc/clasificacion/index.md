# Generalidades

```html
<sisdai-capa-geojson
  id="clasificada"
  nombre="Capa clasificada"
  :datos="edos"
  :zIndex="1"
  :clasificacion="{
    tipo: 'categorias',
    columna: 'grado_marg',
    propiedadEstilo: 'relleno',
    colores: ['red', 'black', 'yellow', 'green', 'orange'],
  }"
/>
```
