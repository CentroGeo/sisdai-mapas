<script setup>
import CapasXyz from "./../.vitepress/components/capas/xyz.vue";
</script>

# Capa XYZ

La capa de mosaicos xyz, consume servicios que dentro del ulr incluyen el nivel de zoom y la coordenada x/y de una imagen (mosaico), regularmente se usa para desplegar mapas base como los de OSM, Carto, etc.

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaXyz />
</SisdaiMapa>
```

## Propiedades

Hereda las propiedades definidas en la sección Capas más las siguientes:

#### `acercamientoMaximo`

Nivel de acercamiento máximo.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: ❌

#### `acercamientoMinimo`

Nivel de acercamiento mínimo.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: ❌

#### `url`

Url remota de la capa.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: ❌

## Ejemplo

<CapasXyz />

<<< @/.vitepress/components/capas/xyz.vue
