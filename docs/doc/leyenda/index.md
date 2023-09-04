# SisdaiMapaLeyenda

Este componente permite agregar, dentro de uno de los contenedores del mapa, una leyenda interactiva vinculada a las capas agregadas en el mapa.

## Uso

```html
<SisdaiMapa>
  <SisdaiMapaEncabezado>
    <SisdaiMapaLeyenda para="osmId" />
  </SisdaiMapaEncabezado>

  <SisdaiMapaCapas>
    <SisdaiCapaOsm
      id="osmId"
      nombre="Capa de OpenStreetMap"
    />
  </SisdaiMapaCapas>
</SisdaiMapa>
```

## Propiedades

#### `para`

- Tipo: `String` o `Array`
- Obligatorio: ✅
- Interactivo: ✅

Identificador de la capa a la que se quiere vincular el control de leyenda.

#### `titulo`

- Tipo: `String`
- Valor por defecto: `undefined`
- Interactivo: ✅

Titulo que tendrá la leyenda por encima de los controles de las capas con las que se vincule.

## Ejemplo

<leyenda-Interactividad />
