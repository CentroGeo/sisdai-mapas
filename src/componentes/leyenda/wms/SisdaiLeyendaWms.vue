<script setup>
import { computed, ref, toRefs, watch } from 'vue'
import SisdaiLeyendaControl from './../control'
import _props from './props'
import { GetLegendGraphic, utils } from 'geoserver-api-reader'
import axios from 'axios'
import { acomodarReglasWms } from '../../../../docs/.vitepress/src/utiles/leyenda'

const props = defineProps(_props)
const {
  deshabilitado,
  feunte,
  informacion,
  nombre,
  sinControl,
  sinControlClases,
  titulo,
  visible,
} = toRefs(props)

function actualizarClasesDesdeWms() {
  const leyenda = new GeoserverCapa2({
    capa: nombre.value,
    fuente: feunte.value,
  })

  axios(leyenda.url)
    .then(({ data, status }) => {
      if (status !== 200) return

      console.log(acomodarReglasWms(data))
    })
    .catch(() => {})
}
actualizarClasesDesdeWms()

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
        :deshabilitado="deshabilitado"
        :encendido="capaEncendida"
        :encendidoIndeterminado="encendidoIndeterminado"
        :etiqueta="titulo"
        :informacion="informacion"
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
            :sinControl="sinControlClases"
            @alCambiar="valor => (clase.visible = valor)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
class Clase {
  visible = false

  constructor(titulo) {
    this.titulo = titulo
  }
}

class GeoserverCapa2 extends GetLegendGraphic {
  constructor(parameters) {
    super(parameters)

    this._formato = 'application/json'
    this._legendOptions = undefined
    this._fuente = parameters.fuente
  }

  get url() {
    return `${utils.urlService(this._fuente, this._servicio)}${this.parametrosEnFormatoURL}`
  }
}
</script>
