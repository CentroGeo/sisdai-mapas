<script setup>
import { toRefs } from 'vue'
import _props from './props'
import { idAleatorio } from '../../../utiles'
import eventos from './eventos'
// import SisdaiLeyendaSimbolo from './../simbolo'

const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const {
  deshabilitado,
  encendido,
  encendidoIndeterminado,
  etiqueta,
  informacion,
  simbolo,
  sinControl,
} = toRefs(props)
const idCheck = `${props.id}-${idAleatorio()}`

// Cuando indeterminado cambie a verdadero, el encendido debe cambiar a verdadero
// Cuando encendido cambie a verdadero o falso, el indeterminado debe cambiar a falso
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
        <!-- <SisdaiLeyendaSimbolo
          v-if="simbolo"
          :simbolo="simbolo"
        /> -->
        <svg
          v-if="simbolo"
          aria-hidden="true"
          class="figura-variable"
          :height="simbolo.tamanio"
          :style="{
            '--controlador-vis-figura-alto': `${simbolo.tamanio}px`,
            'min-width': `${simbolo.espacio}px`,
          }"
          v-html="simbolo.xml"
          :width="simbolo.espacio"
        ></svg>
        <span
          class="nombre-variable"
          v-html="etiqueta"
        />
        <span
          v-if="informacion !== undefined"
          class="info pictograma-informacion m-l-1"
          tabindex="0"
          v-globo-informacion="informacion"
        />
      </p>
    </template>

    <template v-else>
      <input
        :checked="encendido"
        :disabled="deshabilitado"
        :id="idCheck"
        :indeterminate="encendidoIndeterminado"
        @input="({ target }) => emits(eventos.alCambiar, target.checked)"
        type="checkbox"
      />
      <label :for="idCheck">
        <svg
          v-if="simbolo"
          aria-hidden="true"
          class="figura-variable"
          :height="simbolo.tamanio"
          :style="{
            '--controlador-vis-figura-alto': `${simbolo.tamanio}px`,
            'min-width': `${simbolo.espacio}px`,
          }"
          v-html="simbolo.xml"
          :width="simbolo.espacio"
        ></svg>
        <span
          class="nombre-variable"
          v-html="etiqueta"
        />
        <span
          v-if="informacion !== undefined"
          class="info pictograma-informacion m-l-1"
          tabindex="0"
          v-globo-informacion="informacion"
        />
      </label>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.controlador-vis {
  .lectura {
    padding: 0;
  }
  .info {
    padding: 0;
    font-size: 1.25rem;
  }
}
</style>
