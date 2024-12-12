<!-- <script setup>
import { ref } from 'vue'

const abierto = ref(false)
</script> -->

<template>
  <details class="instruccional-navegacion-teclado">
    <summary>Navegación por teclado</summary>
    <p>
      Sisdai-mapas te permite navegar el mapa desde tu teclado cuando está enfocado a través de los
      siguientes comandos:
    </p>
    <ul>
      <li>
        <b>
          Teclas
          <span class="pictograma-flecha-izquierda" aria-hidden="true" />
          <span class="pictograma-flecha-derecha" aria-hidden="true" />
          <span class="pictograma-flecha-arriba" aria-hidden="true" />
          <span class="pictograma-flecha-abajo" aria-hidden="true" />

          <span class="a11y-solo-lectura">
            flecha izquierda, flecha abajo, flecha derecha y flecha arriba
          </span>
        </b>
        Navegar por el mapa y buscar funciones.
      </li>
      <li>
        <b>
          Tecla <span class="pictograma-agregar" aria-hidden="true" />
          <span class="a11y-solo-lectura">más</span>
        </b>
        Acercar el mapa.
      </li>
      <li>
        <b>
          Tecla <span class="pictograma-restar" aria-hidden="true" />
          <span class="a11y-solo-lectura"> menos </span>
        </b>
        Alejar el mapa.
      </li>
      <li>
        <b>Tecla <span>D</span></b> Rotar el mapa hacia la derecha.
      </li>
      <li>
        <b>Tecla <span>A</span></b> Rotar el mapa hacia la izquierda.
      </li>
      <li>
        <b>Tecla <span>N</span></b> Rotar el mapa hacia el norte.
      </li>
      <li>
        <b>Tecla <span>H</span></b> Regresar a la ubicación inicial del mapa.
      </li>
    </ul>

    <!-- <button class="hipervinculo m-b-1" @click="abierto = !abierto">Navegación por teclado</button>
    <div class="contenido-colapsabel" :class="{ abierto: abierto }">
      <div class="instruccional-navegacion-teclado notas alerta informativa p-2">
        <p class="m-t-0">
          Sisdai-mapas te permite navegar el mapa desde tu teclado a través de los siguientes
          comandos:
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
          <button class="hipervinculo" @click="abierto = false">Cerrar</button>
        </div>
      </div>
    </div> -->
  </details>
</template>

<style lang="scss" scoped>
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}

// .instruccional-navegacion-teclado {
//   .contenido-colapsabel {
//     max-height: 0;
//     overflow-y: hidden;
//     display: none;
//     &.abierto {
//       max-height: none;
//       display: block;
//     }
//   }
//   .hipervinculo {
//     font-size: 0.75rem;
//   }
//   .alerta {
//     width: auto;

//     ul li {
//       margin-top: 8px;
//     }
//   }
//   .derecha {
//     display: flex;
//     justify-content: right;
//   }
// }
</style>
