# Teselas

Las capas por teselas están conformadas por un conjunto de imágenes georeferencidas vecinas. Estas capas se usan principalmente como capas base de un mapa por su alto rendimiento y escalabilidad en efectos de visualización.

## Propiedades

#### `url`

- Tipo: `String`
- Valor por defecto: `undefined`
- Interactivo: ❌

Url remota de la capa.

## Eventos

#### `@alIniciarCargaTesela`

Evento ejecutado cuando se detecta que ha iniciado la carga de cada uno de los mosaicos que conponen la capa visible en el mapa.

Sin parámetros esperados.

#### `@alFinalizarCargaTesela`

Evento ejecutado cuando se detecta que ha finalizado la carga de cada uno de los mosaicos que conponen la capa visible en el mapa.

Parámetros esperados:

- cargaExitosa: `Boolean` Indica si la carga del mosaico no ha presentado error.
