<script setup>
import { computed, ref, toRefs, watch } from 'vue'
import SisdaiLeyendaControl from './../control'
import _props from './props'

const props = defineProps(_props)
const { informacion, nombre, sinControl, sinControlClases, titulo, visible } =
  toRefs(props)

class Clase {
  visible = false

  constructor(titulo) {
    this.titulo = titulo
  }
}

const clases = ref([new Clase(0), new Clase(1), new Clase(2)])
function asignarVisibilidad(nv) {
  clases.value.forEach(clase => (clase.visible = nv))
  // console.log(clases.value.map(({ visible }) => visible))
}
asignarVisibilidad(visible.value)
watch(visible, asignarVisibilidad)

/**
 *
 */
const encendidoIndeterminado = computed(
  () =>
    clases.value.some(({ visible }) => visible) &&
    !clases.value.every(({ visible }) => visible)
)

const capaEncendida = computed({
  // get: () => visible.value,
  get: () => clases.value.some(({ visible }) => visible),
  set: valor => asignarVisibilidad(valor),
})
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <div class="leyenda-titulo">
      <SisdaiLeyendaControl
        @alCambiar="valor => (capaEncendida = valor)"
        :encendido="capaEncendida"
        :encendidoIndeterminado="encendidoIndeterminado"
        :etiqueta="titulo"
        :informacion="informacion"
        :sinControl="sinControl"
        :ver="true"
      />
    </div>

    <div
      v-if="clases.length > 1"
      class="leyenda-clases casillas-subseleccion"
    >
      <ul class="casillas-anidadas">
        <li
          v-for="(clase, idx) in clases"
          :key="`${nombre}-clase-control-${idx}`"
        >
          <!-- {{ clase }} -->
          <SisdaiLeyendaControl
            :id="`${nombre}-clase-control-${idx}`"
            :encendido="clase.visible"
            :etiqueta="clase.titulo"
            :sinControl="sinControlClases"
            @alCambiar="valor => (clase.visible = valor)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
