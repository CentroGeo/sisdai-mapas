# Leyenda vinculada

Utiliza el componente de leyenda para vincular un control de visibilidad de las
capas que se encuentran definidas en el mapa. Este componente también permite
visualizar la simbología de las capas [vectoriales](/mapas/capa-vectorial.html)
y [wms](/mapas/capa-wms.html).

**Uso:**

```vue
<SisdaiMapa>
  <template #panel-*-vis>
    <SisdaiLeyenda para="<String(id de la capa)>" />
  </template>
</SisdaiMapa>
<!-- *: encabezado, pie, izquierda o derecha -->
```

## Vista general

<VisorCodigo archivo="LeyendaVinculada.vue" />

## Propiedades

### `para`

Recibe el identificador de la capa con la que se quiere vincular la leyenda.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: si

### `sinControl`

Define si se agrega el control (input) en el titulo de la leyenda. El control se
vincula con la visibilidad de la capa.

- Tipo: `Boolean`
- Valor por defecto: `false`
- Reactivo: si

## Eventos

Dependiendo de la capa vinculada (vectorial, wms u otra), heredará los eventos
que tenga su respectiva leyenda.
