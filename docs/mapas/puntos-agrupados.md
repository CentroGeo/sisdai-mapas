# Puntos agrupados

Los puntos agrupados permiten reducir los elementos visibles en el mapa de una
capa de puntos. Para ello, el mapa toma los puntos que se encuentran dentro de
una tolerancia de distancia determinada entre sí (grupo) y los ubica en un mismo
punto.

## Vista general

<VisorCodigo archivo="PuntosAgrupados.vue" />

## Propiedades

### `campoDelimitador`

Campo que evita que los puntos se agrupen dependiendo se el valor de su
atributo.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: no

### `distancia`

Distancia en píxeles dentro de la cual se agruparán las entidades. Número
minDistance (predeterminado a 0).

- Tipo: `Number`
- Valor por defecto: `20`
- Reactivo: no

### `distanciaMinima`

Distancia mínima en píxeles entre grupos. Se limitará a la distancia
configurada. De manera predeterminada, no se garantiza ninguna distancia mínima.
Esta configuración se puede utilizar para evitar la superposición de íconos.
Como compensación, la posición de la entidad del grupo ya no será el centro de
todas sus entidades.

- Tipo: `Number`
- Valor por defecto: `0`
- Reactivo: no
