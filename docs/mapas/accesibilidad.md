<script setup>
import MapaAccesibilidad from "@ejemplos/MapaAccesibilidad.vue";
</script>

# Accesibilidad

Los mapas creados desde los componentes Sisdai, cuentan con un orden lógico y
jerárquico en la aparición de los elementos.

Los botones de acercamiento y alejamiento, el mapa, la simbología y los
elementos opcionales son accesibles a través del teclado y el lector de
pantalla. Además, sisdai-mapas cuenta con atajos de teclado para navegar el mapa
más fácilmente.

<MapaAccesibilidad />

## Navegación por teclado

- Tabulador: Acceder a los elementos interactivos del mapa

<p>
  Al tener el enfoque en el mapa, usa la siguientes teclas para navegar, ajustar o rotar la vista del mapa:
</p>

<ul>
  <li>
    Navegar por el mapa:
    <span class="botones-direccion">
      <kbd>
        <span
          class="pictograma-flecha-izquierda"
          aria-hidden="true"
        />
        <span class="a11y-solo-lectura">flecha izquierda</span>
      </kbd>
      <kbd>
        <span
          class="pictograma-flecha-abajo"
          aria-hidden="true"
        />
        <span class="a11y-solo-lectura">flecha abajo</span>
      </kbd>
      <kbd>
        <span
          class="pictograma-flecha-derecha"
          aria-hidden="true"
        />
        <span class="a11y-solo-lectura">flecha derecha</span>
      </kbd>
      <kbd>
        <span
          class="pictograma-flecha-arriba"
          aria-hidden="true"
        />
        <span class="a11y-solo-lectura">flecha arriba</span>
      </kbd>
    </span>
  </li>
  <li>
    Acercar:
    <kbd class="botones-direccion">
      <span
        class="pictograma-agregar"
        aria-hidden="true"
      />
      <span class="a11y-solo-lectura">más</span>
    </kbd>
  </li>
  <li>
    Alejar:
    <kbd class="botones-direccion">
      <span
        class="pictograma-restar"
        aria-hidden="true"
      />
      <span class="a11y-solo-lectura">menos</span>
    </kbd>
  </li>
  <li>
    Rotar hacia la derecha:
    <kbd class="botones-direccion letra">D</kbd>
  </li>
  <li>
    Rotar hacia la izquierda:
    <kbd class="botones-direccion letra">A</kbd>
  </li>
  <li>
    Rotar hacia el norte:
    <kbd class="botones-direccion letra">N</kbd>
  </li>
  <li>
    Regresar a la ubicación inicial:
    <kbd class="botones-direccion letra">H</kbd>
  </li>
</ul>

<!-- - Para obtener detalles sobre su área actual, presione la tecla `i`. -->

<!-- **Navegación de los elementos en la vista**

Acciona el botón <span class="icono-accesibilidad" aria-hidden="true" /> para visualizar las instrucciones para acceder a los elementos accesibles en la vista del mapa (puntos vectoriales). -->

<!-- <<< @/.vitepress/components/accesibilidad/teclado.vue -->
