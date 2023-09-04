# Tipos de clasificación cuantitativa

<capas-ClasificacionCuantiles />

```html
<sisdai-capa-geojson
  id="clasificada"
  nombre="Capa clasificada"
  :datos="edos"
  :zIndex="1"
  :clasificacion="{
    tipo: tipoClasificacion,
    columna: 'pob18ymas',
    propiedadEstilo: 'relleno',
    colores: colores,
    clasificacionPersonalizada: [
      [540672,1706000],
      [1706000,2923000],
      [2923000,4579000],
      [4579000,6027000],
      [6027000,12083969],
    ]
  }"
/>
```
