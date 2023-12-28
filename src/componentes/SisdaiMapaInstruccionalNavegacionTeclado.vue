<script setup>
import { ref } from 'vue'

const abierto = ref(false)
</script>

<template>
  <div class="instruccional-navegacion-teclado">
    <button
      class="hipervinculo m-b-1"
      @click="abierto = !abierto"
    >
      <!-- @click="abierto = !abierto" -->
      Navegación por teclado
    </button>
    <div
      class="contenido-colapsabel"
      :class="{ abierto: abierto }"
    >
      <div
        class="instruccional-navegacion-teclado notas alerta informativa p-2"
      >
        <!-- :class="{ abierto: abierto }" -->
        <p class="m-t-0">
          Sisdai-mapas te permite navegar el mapa desde tu teclado a través de
          los siguientes comandos:
        </p>
        <ul>
          <li>
            <b>
              Teclas
              <span class="icono-flecha-izquierda" />
              <span class="icono-flecha-derecha" />
              <span class="icono-flecha-arriba" />
              <span class="icono-flecha-abajo" />
            </b>
            Navegar por el mapa y buscar funciones.
          </li>
          <li>
            <b>Tecla <span class="icono-agregar" /></b> Acercar el mapa.
          </li>
          <li>
            <b>Tecla <span class="icono-restar" /></b> Alejar el mapa.
          </li>
          <li><b>Tecla D</b> Rotar el mapa hacia la derecha.</li>
          <li><b>Tecla A</b> Rotar el mapa hacia la izquierda.</li>
          <li><b>Tecla N</b> Rotar el mapa hacia el norte.</li>
          <li><b>Tecla H</b> Regresar a la ubicación inicial del mapa.</li>
        </ul>
        <div class="derecha">
          <button
            class="hipervinculo"
            @click="abierto = false"
          >
            <!-- @click="abierto = false" -->
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.instruccional-navegacion-teclado {
  .contenido-colapsabel {
    max-height: 0;
    overflow-y: hidden;
    display: none;
    &.abierto {
      max-height: none;
      display: block;
    }
  }
  .hipervinculo {
    font-size: 0.75rem;
  }
  .alerta {
    width: auto;

    ul li {
      margin-top: 8px;
    }
  }
  .derecha {
    display: flex;
    justify-content: right;
  }
}
</style>
