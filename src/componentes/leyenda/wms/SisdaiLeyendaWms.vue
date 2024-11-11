<script setup>
import { computed, ref, toRefs, watch } from 'vue'
import SisdaiLeyendaControl from './../control'
import _props from './props'
import axios from 'axios'
import { GeoserverCapa2, acomodarReglasWms } from './utils'

const props = defineProps(_props)
const {
  deshabilitado,
  fuente,
  informacion,
  nombre,
  sinControl,
  sinControlClases,
  titulo,
  visible,
} = toRefs(props)

const clases = ref([])
watch(
  () => clases.value.map(({ visible }) => visible),
  (nv) => {
    console.log(nv);
  }
)
function actualizarClasesDesdeWms([capa, fuente]) {
  const leyenda = new GeoserverCapa2({ capa, fuente })

  axios(leyenda.url)
    .then(({ data, status }) => {
      if (status !== 200) return

      // const reglas = acomodarReglasWms(data)
      // console.log(reglas[0].simbolo)
      clases.value = acomodarReglasWms(data)
      asignarVisibilidad(visible.value)
    })
    .catch(() => {})
}
actualizarClasesDesdeWms([nombre.value, fuente.value])
watch([nombre, fuente], actualizarClasesDesdeWms)

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

/**
 *
 */
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
        :deshabilitado="deshabilitado"
        :encendido="capaEncendida"
        :encendidoIndeterminado="encendidoIndeterminado"
        :etiqueta="titulo"
        :informacion="informacion"
        :simbolo="clases.length === 1 ? clases[0].simbolo : undefined"
        :sinControl="sinControl"
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
            :deshabilitado="deshabilitado"
            :encendido="clase.visible"
            :etiqueta="clase.titulo"
            :simbolo="clase.simbolo"
            :sinControl="sinControlClases"
            @alCambiar="valor => (clase.visible = valor)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script></script>
