<script setup>
import { toRefs } from 'vue'
import _props from './props'
import { idAleatorio } from '../../../utiles'
import eventos from './eventos'
import SisdaiLeyendaSimbolo from './../simbolo'

const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { deshabilitado, etiqueta, informacion, sinControl } = toRefs(props)

const idCheck = `${props.id}-${idAleatorio()}`
</script>

<template>
  <div class="controlador-vis">
    <template v-if="sinControl">
      <p class="lectura">
        <SisdaiLeyendaSimbolo />
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
        :disabled="deshabilitado"
        :id="idCheck"
        @input="({ target }) => emits(eventos.alCambiar, target.checked)"
        type="checkbox"
      />
      <label :for="idCheck">
        <SisdaiLeyendaSimbolo />
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
