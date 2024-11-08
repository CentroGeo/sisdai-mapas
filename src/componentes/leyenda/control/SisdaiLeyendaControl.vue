<script setup>
import { toRefs } from 'vue'
import _props from './props'
import { idAleatorio } from '../../../utiles'

const props = defineProps(_props)
const { etiqueta, sinControl } = toRefs(props)

const idCheck = `${props.id}-${idAleatorio()}`
</script>

<template>
  <div class="controlador-vis">
    <template v-if="sinControl">
      <span
        class="nombre-variable"
        v-html="etiqueta"
      />
    </template>

    <template v-else>
      <input
        type="checkbox"
        :id="idCheck"
      />
      <label :for="idCheck">
        <span
          class="nombre-variable"
          v-html="etiqueta"
        />
      </label>
    </template>
  </div>
</template>
