# Mapa dividido

La vista interactiva del mapa cuenta con una funcionalidad de **mapa divido
(swipe)**. Permite visualizar capas en una sección o lado de la vista del mapa.

En el siguiente ejemplo muestra una vista dividida que se puede activar y
desactivar. Cuando está activa, tiene una capa xyz de fondo sin sección o lado
por definir, una capa wms del lado izquierdo y una capa vectorial del lado
derecho.

<VisorCodigo archivo="MapaDividido.vue" />

## Propiedades

### `dividir`

Define el porcentaje de división de la vista del mapa, para dividirlo al 50%
defina esta propiedad como 50.

- Componente: **SisdaiMapa**
- Tipo: `Number`
- Valor por defecto: `undefined`
- Reactivo: si

<div class="nota-contenedor">
  <p class="nota-titulo">Información:</p>
  <p class="nota">
    Esta funcionalidad solo será visible cuando la propiedad `dividir` tenga valor.
  </p>
</div>

### `lado`

Define la sección o lado en el que se requiera establecer una capa (izquierdo o
derecho).

- Componente: **SisdaiCapa**
- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: si
