<script setup>
import EjemploVista from "./../.vitepress/components/vista.vue";
</script>

# Propiedad `vista`

Los atributos de la vista del mapa manipulan el espacio interactivo visible del mismo. Con estas propiedades se puede definir la posicion inicial de la vista o los cambios que puede tener.

## Atributos

#### `centro`

- Tipo: `Array`
- Valor por defecto: `[0, 0]`
- Interactivo: ✅

Coordenadas `[x, y]` del centro inicial de la vista.

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

#### `extension`

- Tipo: `Array`
- Valor por defecto: `undefined`
- Interactivo: ✅

Coordenadas extremas `[x1, y1, x2, y2]` de la caja envolvente de la vista.

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si esta propiedad es definida o diferente al valor por defecto, las propiedades `centro` y `zoom` serán ignoradas.

#### `zoom`

- Tipo: `Number`
- Valor por defecto: `1`
- Interactivo: ✅

Nivel de zoom utilizado para calcular la resolución inicial de la vista.

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

## Funciones

## Eventos

<EjemploVista />

<<< @/.vitepress/components/vista.vue
