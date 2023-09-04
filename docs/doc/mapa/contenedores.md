# Contenedores

Los contenedores en esta biblioteca permiten agregar elementos html o componentes externos a ella como herramientas de apoyo en la interacción del mapa. La posición de estos elementos depende del tipo de contenedor que se utilice.

## Tipos

- `<SisdaiMapaEncabezado />`
- `<SisdaiMapaIzquierda />`
- `<SisdaiMapaDerecha />`
- `<SisdaiMapaPie />`

## Uso

```html{2-4}
<SisdaiMapa>
  <SisdaiMapaEncabezado>
    <!-- Aquí se pueden añadir otros elementos -->
  </SisdaiMapaEncabezado>

  <SisdaiMapaIzquierda />

  <SisdaiMapaDerecha />

  <SisdaiMapaPie />
</SisdaiMapa>
```

## SisdaiMapaCapas

El contenedor `<SisdaiMapaCapas>` no tiene lugar en la disposición de elementos, sirve como guía o agrupación de las capas que se registran en el mapa y es te carácter opcional, ejemplo:

```html{4-8}
<SisdaiMapa>
  <!-- otros contenedores -->

  <SisdaiMapaCapas>
    <SisdaiCapaXyz />
    <SisdaiCapaGeojson />
    <SisdaiCapaWms />
  </SisdaiMapaCapas>

  <!-- otros contenedores -->
</SisdaiMapa>
```
