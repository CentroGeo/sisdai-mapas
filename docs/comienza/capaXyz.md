<script setup>
import CapaXyz from "./../.vitepress/ejemplos/CapaXyz.vue";
</script>

# Capa XYZ

La capa de mosaicos xyz, consume servicios que dentro del ulr incluyen el nivel de acercamiento y la coordenada x/y de una imagen (mosaico), regularmente se usa para desplegar mapas base como los de OSM, Carto, etc.

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaXyz />
</SisdaiMapa>
```

## Propiedades

Hereda las propiedades definidas en la sección Capas más las siguientes:

<!-- #### `acercamientoMaximo`

Nivel de acercamiento máximo.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: No

#### `acercamientoMinimo`

Nivel de acercamiento mínimo.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: No -->

#### `url`

Url remota de la capa.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: No

## Funciones

#### `@alIniciarCargaTesela`

Ejecutado cuando se detecta que ha iniciado la carga de cada uno de los mosaicos que conponen la capa visible en el mapa.

#### `@alFinalizarCargaTesela`

Ejecutado cuando se detecta que ha finalizado la carga de cada uno de los mosaicos que conponen la capa visible en el mapa.

**Parametros:**

- `Boolean`: Indica con `false` si al finalizar la carga del mosaico ha presentado error.

## Ejemplo

<CapaXyz />

<<< @/.vitepress/ejemplos/CapaXyz.vue{9-15}
