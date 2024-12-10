<script setup>
import { ref } from 'vue'

const sisdaiModal = ref()
</script>

<template>
  <div
    class="sisdai-mapa-control contenedor-boton-instruccional ol-unselectable"
  >
    <button
      aria-label="Navegación por teclado"
      class="sisdai-mapa-control boton-pictograma boton-primario"
      role="button"
      type="button"
      v-globo-informacion="'Navegación por teclado'"
      @click="sisdaiModal?.abrirModal()"
    >
      <span
        :class="`pictograma-${'teclado'}`"
        aria-hidden="true"
      />
    </button>
  </div>

  <SisdaiModal
    ref="sisdaiModal"
    class="modal-instruccional"
  >
    <template #encabezado>
      <h1 class="modal-titulo">Navegación por teclado</h1>
    </template>
    <template #cuerpo>
      <p>
        Usa la siguientes teclas para navegar, ajustar o rotar la vista del
        mapa:
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
    </template>
  </SisdaiModal>
</template>

<style lang="scss" scoped>
.contenedor-boton-instruccional {
  top: var(--margen);
  left: var(--margen);
}

.modal-instruccional .botones-direccion {
  display: inline-flex;
  gap: 8px;

  [class^='pictograma-']:before {
    font-weight: bolder;
  }

  &.letra {
    // font-size: small;
    padding-inline: 0.5em;
  }
}
</style>
