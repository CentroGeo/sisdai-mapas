# Puntos desplazados

La metodología de puntos desplazados permite visualizar todas las
características de una capa de puntos, incluso si tienen la misma ubicación.
Para ello, el mapa toma los puntos que se encuentran dentro de una tolerancia de
distancia determinada entre sí (grupo) y los ubica alrededor de su baricentro
siguiendo diferentes métodos de ubicación.

<div class="nota-contenedor">
  <p class="nota-titulo">
    Notas:
  </p>
  <p class="nota">
    La metodología de puntos desplazados no altera la geometría de la fuente, lo que significa que los puntos no se mueven de su posición. Los cambios son solo visuales, con fines de representación. Cada baricentro es en sí mismo un grupo con características de atributos que contienen las características originales.
  </p>
</div>

## Vista general

<VisorCodigo archivo="PuntosDesplazados.vue" />

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

### `metodo`

Método de desplazamiento a utilizar, puede ser:

- anillo: coloca todas las entidades en un círculo cuyo radio depende de la
  cantidad de entidades que se mostrarán.
- anillos-concentricos: utiliza un conjunto de círculos concéntricos para
  mostrar las entidades.
- Espiral: crea una espiral con las entidades más alejadas del centro del grupo
  en cada giro.
- Cuadrícula: genera una cuadrícula regular con un símbolo de punto en cada
  intersección.

- Tipo: `String`
- Valor por defecto: `anillo`
- Reactivo: no

### `radioPuntoCentro`

Radio en píxeles para el punto céntrico de cada grupo

- Tipo: `Number`
- Valor por defecto: `5`
- Reactivo: no

### `radioPuntosDesplazados`

Radio en píxeles para para los puntos dezplazados o alrrededor de cada grupo

- Tipo: `Number`
- Valor por defecto: `5`
- Reactivo: no
