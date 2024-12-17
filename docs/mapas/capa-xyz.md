# Capa XYZ

La capa de mosaicos xyz, consume servicios que dentro de su url incluyen el
nivel de zoom y la coordenada x-y de una imagen (mosaico), regularmente se usa
para agregar mapas base.

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaXyz />
</SisdaiMapa>
```

## Vista general

<VisorCodigo archivo="CapaXyz.vue" />

## Propiedades

Hereda las propiedades definidas en la
[sección general de capas](/mapas/capa.html) más las siguientes:

<!-- ### `acercamientoMaximo`

Nivel de acercamiento máximo.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: no

### `acercamientoMinimo`

Nivel de acercamiento mínimo.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: no -->

### `fuente`

Url fuente de la capa.

- Tipo: `String`
- Valor por defecto:
  `https://{a-c}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png`
- Reactivo: no

## Funciones

### `@alIniciarCargaTesela`

Ejecutado cuando se detecta que ha iniciado la carga de cada uno de los mosaicos
que conponen la capa visible en el mapa.

### `@alFinalizarCargaTesela`

Ejecutado cuando se detecta que ha finalizado la carga de cada uno de los
mosaicos que conponen la capa visible en el mapa.

**Parametros:**

- `Boolean`: Indica con `false` si al finalizar la carga del mosaico ha
  presentado error.
