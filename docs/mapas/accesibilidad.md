<script setup>
import AccesibilidadTeclado from "./../.vitepress/components/accesibilidad/teclado.vue";
</script>

# Accesibilidad

Los mapas creados desde los componentes Sisdai, cuentan con un orden lógico y
jerárquico en la aparición de los elementos.

Los botones de acercamiento y alejamiento, el mapa, los globos de información,
la simbología y los elementos opcionales son accesibles a través del teclado y
el lector de pantalla. Además, sisdai-mapas cuenta con atajos de teclado para
navegar el mapa más fácilmente

## Navegación de los elementos en la vista

Acciona el botón para visualizar las instrucciones para acceder a los elementos
accesibles en la vista del mapa (puntos vectoriales).

<AccesibilidadTeclado />

Para integrar instrucciones en el mapa:

```vue
<SisdaiMapaInstruccionalNavegacionTeclado />
```

## Navegación por teclado

- Tabulador: Acceder a los elementos interactivos del mapa

Cuando el enfoque está sobre la vista

- Utilice las teclas de flecha para navegar por el mapa y buscar funciones.
- Utilice la tecla más `+` para acercar el mapa y la tecla menos `-` para
  alejarlo.
- Presione la tecla `d` para rotar el mapa hacia la derecha.
- Presione la tecla `a` para rotar el mapa hacia la izquierda.
- Presione la tecla `n` para rotar el mapa hacia el norte.
- Presione la tecla `h` para regresar a la ubicación inicial del mapa.
<!-- - Para obtener detalles sobre su área actual, presione la tecla `i`. -->

<!-- **Navegación de los elementos en la vista**

Acciona el botón <span class="icono-accesibilidad" aria-hidden="true" /> para visualizar las instrucciones para acceder a los elementos accesibles en la vista del mapa (puntos vectoriales). -->

<!-- <<< @/.vitepress/components/accesibilidad/teclado.vue -->
