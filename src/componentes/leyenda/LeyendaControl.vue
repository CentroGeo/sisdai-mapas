<script setup>
import { reactive, toRefs, watch } from 'vue'
import { idAleatorio } from '../../utiles'
import LeyendaSimbolo from './LeyendaSimbolo.vue'

const props = defineProps({
  encendido: {
    type: Boolean,
    default: false,
  },

  encendidoIndeterminado: {
    type: Boolean,
    default: false,
  },

  etiqueta: {
    typo: String,
    default: 'Cargando...',
  },

  globoInformativo: {
    typo: String,
    default: undefined,
  },

  id: {
    type: String,
    default: () => idAleatorio(),
  },

  sinControl: {
    typo: Boolean,
    default: false,
  },

  simbolo: {
    typo: Object,
    default: undefined,
  },

  // tipoControl: {},
})

const idCheck = `${props.id}-${idAleatorio()}`

const {
  encendido,
  encendidoIndeterminado,
  etiqueta,
  globoInformativo,
  simbolo,
  sinControl,
} = toRefs(props)

const estadoCheck = reactive({
  encendido: encendido.value,
  indeterminado: encendidoIndeterminado.value,
})

watch(encendidoIndeterminado, nv => {
  // console.log('encendidoIndeterminado', nv)
  estadoCheck.indeterminado = nv
  if (nv) {
    // Cuando indeterminado cambie a verdadero, el encendido debe cambiar a verdadero
    estadoCheck.encendido = true
  }
})

watch(encendido, nv => {
  estadoCheck.encendido = nv
  // Cuando encendido cambie a verdadero o falso, el indeterminado debe cambiar a falso
  estadoCheck.indeterminado = false
})

const emits = defineEmits(['alCambiar'])

function ver({ target, x, y }) {
  // console.log(target, x, y)
  return { target, x, y }
}
</script>

<template>
  <div
    class="controlador-vis"
    :style="{
      '--controlador-vis-figura-alto': `${simbolo?.tamanio}px`,
    }"
  >
    <template v-if="sinControl">
      <p class="lectura">
        <LeyendaSimbolo
          v-if="simbolo"
          :simbolo="simbolo"
        />
        <span
          class="nombre-variable"
          v-html="etiqueta"
        />
      </p>
    </template>

    <template v-else>
      <input
        type="checkbox"
        :id="idCheck"
        :checked="estadoCheck.encendido"
        :indeterminate="estadoCheck.indeterminado"
        @input="emits('alCambiar', $event.target.checked)"
      />
      <label :for="idCheck">
        <LeyendaSimbolo
          v-if="simbolo"
          :simbolo="simbolo"
        />
        <span
          class="nombre-variable"
          v-html="etiqueta"
        />
        <!-- <button
          class="boton-icono boton-sin-borde boton-chico boton-secundario"
        > -->
        <span
          v-if="globoInformativo !== undefined"
          class="icono-informacion icono-3 m-l-1"
          @mouseover="ver"
          @mouseleave="ver"
        />
        <!-- <span class="a11y-solo-lectura"></span>
        </button> -->
      </label>
    </template>
  </div>
</template>

<style lang="scss">
span.icono-informacion.icono-3 {
  height: fit-content;
}
</style>
