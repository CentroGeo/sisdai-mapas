# Capa WMS

Componente para desplegar capas desde servicios wms públicos o privados.

**Uso:**

```vue{2}
<SisdaiMapa>
  <SisdaiCapaWms />
</SisdaiMapa>
```

## Vista general

<VisorCodigo archivo="CapaWms.vue" />

## Propiedades

Hereda las propiedades definidas en la
[sección general de capas](/mapas/capa.html) más las siguientes:

### `capa`

Nombre de la capa en el servidor de mapas.

- Tipo: `String`
- Valor obligatorio: si
- Reactivo: no

**Uso:**

```vue
<!-- Capa: Sistema Nacional de Investigadoras e Investigadores por sexo y entidad 2022 -->
<SisdaiCapaWms capa="hcti_snii_sexo_22_est_a" />
```

### `consulta`

Reemplaza la función de consulta. Esto permite realizar cambios a las peticiones
antes de que sean realizadas.

- Tipo: `Function`
- Valor por defecto: `url => fetch(url)`
- Reactivo: no

**Uso:**

```js
// Envío de cabeceras en el fetch
function consultaWms(url) {
  const token = 'mi token'

  return fetch(url, {
    headers: { Authorization: token };
  })
}
```

```vue
<!-- Consulta: Modifica el fetch de consulta -->
<SisdaiCapaWms :consulta="consultaWms" />
```

### `estilo`

Nombre del estilo disponible para la capa. Al dejar el valor como indefinido,
mostrará el estilo de la capa por defecto que tenga en el servidor.

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: si

**Uso:**

```vue
<!-- Estilo: Número de mujeres con membresía vigente -->
<SisdaiCapaWms estilo="hcti_snii_sexo_22_est_a_investigadoras" />
```

### `filtro`

Filtro en sintaxis CQL, compatible con la
[Api de Geoserver](https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html).

- Tipo: `String`
- Valor por defecto: `undefined`
- Reactivo: si

**Uso:**

```vue
<!-- Filtro:  -->
<SisdaiCapaWms filtro="filtro-CQL" />
```

### `fuente`

Url fuente del servicio WMS.

- Tipo: `String`
- Valor por defecto: `'https://gema.conahcyt.mx/geoserver/wms'`
- Reactivo: no

**Uso:**

```vue
<!-- Fuente: Capas wms de gema -->
<SisdaiCapaWms fuente="https://gema.conahcyt.mx/geoserver/wms" />
```

### `mosaicos`

Establece si la consulta de la capa será por mosaicos o teselas. Cuando el valor
es falso la carga será de una sola imagen.

Tipo: `Boolean` Valor por defecto: `false` Reactivo: no

### `tipoServidor`

Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o
qgis.

- Tipo: `String`
- Valor por defecto: `geoserver`
- Reactivo: no

**Uso:**

```vue
<!-- Tipo de servidor: Geoserver -->
<SisdaiCapaWms tipoServidor="geoserver" />
```

<!-- ### `tituloClases`

Titulo de las clases de la leyenda, solo aplica si la capa cuenta con reglas de estilo de clasificación.

- Tipo: `String`.
- Valor por defecto: `undefined`.
- Reactivo: Si. -->
