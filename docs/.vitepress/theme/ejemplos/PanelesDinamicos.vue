<script setup>
import { valores } from '@centrogeomx/sisdai-mapas'
import { ref } from 'vue'

const margenes = ref(true)
const panel = ref(false)
</script>

<template>
  <div class="flex m-b-2">
    <button
      class="boton-primario boton-chico"
      @click="margenes = !margenes"
    >
      {{ margenes ? 'No' : '' }} Mostrar margenes
    </button>
    <button
      class="boton-primario boton-chico"
      @click="panel = !panel"
    >
      {{ panel ? 'No' : '' }} Mostrar panel derecho
    </button>
  </div>

  <SisdaiMapa
    :class="{ gema: !margenes, 'control-deslizado': panel }"
    :vista="{ extension: valores.extensiones.nacional }"
  >
    <SisdaiCapaXyz />

    <!-- v-if="panel" -->
    <template #panel-derecha-vis>
      <button
        class="boton-primario boton-chico"
        @click="panel = !panel"
      >
        {{ panel ? 'No' : '' }} Mostrar panel derecho
      </button>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus velit
        aperiam maiores quidem magni ex exercitationem, culpa iure aspernatur
        esse animi odio veritatis nulla tempora eligendi deleniti consectetur
        sit saepe?
      </p>
    </template>
  </SisdaiMapa>
</template>

<style lang="scss">
.gema .panel-derecha-vis {
  // background-color: var(--fondo-neutro);
  // padding: 0 !important;
  margin: 0 !important;
  max-width: 200px;
  overflow-y: auto;
  max-height: fit-content;
}

// .gema.control-deslizado .sisdai-mapa-control.contenedor-controles-vista {
.gema.control-deslizado .sisdai-mapa-control.contenedor-controles-vista {
  right: calc(var(--margen) + 200px);
}
</style>
