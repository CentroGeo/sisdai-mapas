<script setup>
import { computed, ref, toRefs, watch } from 'vue'
import SisdaiLeyendaControl from './../control'
import eventos from './eventos'
import _props from './props'

const emits = defineEmits(eventos)
const props = defineProps(_props)
const {
  deshabilitado,
  estilo,
  fuente,
  informacion,
  nombre,
  sinControl,
  sinControlClases,
  titulo,
  visible,
} = toRefs(props)

const clases = ref()
watch(
  () => clases.value?.lista.map(({ visible }) => visible),
  nv => emits(eventos.alCambiarVisibilidad, nv)
)

function actualizarClasesDesdeWms([capa, estilo, fuente]) {
  props
    .consulta(new GeoserverLeyenda({ capa, estilo, fuente }).url)
    .then(response => response.json())
    .then(data => {
      clases.value = new Clases(data)
      asignarVisibilidad(visible.value)
    })
    .catch(() => {})
    .finally(() => {})
}
actualizarClasesDesdeWms([nombre.value, estilo.value, fuente.value])
watch([nombre, estilo, fuente], actualizarClasesDesdeWms)

function asignarVisibilidad(nv) {
  clases.value?.lista.forEach(clase => (clase.visible = nv))
}
asignarVisibilidad(visible.value)
watch(visible, asignarVisibilidad)

/**
 *
 */
const encendidoIndeterminado = computed(
  () =>
    clases.value?.lista.some(({ visible }) => visible) &&
    !clases.value?.lista.every(({ visible }) => visible)
)

/**
 *
 */
const capaEncendida = computed({
  // get: () => visible.value,
  get: () => clases.value?.lista.some(({ visible }) => visible),
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
        :simbolo="clases?.lista.length === 1 ? clases?.lista[0].svg : undefined"
        :sinControl="sinControl"
      />
    </div>

    <div
      v-if="clases?.lista.length > 1"
      class="leyenda-clases casillas-subseleccion"
    >
      <ul class="casillas-anidadas">
        <li
          v-for="(clase, idx) in clases.lista"
          :key="`${nombre}-clase-control-${idx}`"
        >
          <!-- {{ clase }} -->
          <SisdaiLeyendaControl
            :id="`${nombre}-clase-control-${idx}`"
            :deshabilitado="deshabilitado"
            :encendido="clase.visible"
            :etiqueta="clase.titulo"
            :simbolo="clase.svg"
            :sinControl="sinControlClases"
            @alCambiar="valor => (clase.visible = valor)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { GetLegendGraphic } from 'geoserver-api-reader'
import { ejecutarMetodoArrayEnObjeto } from './../../../utiles'
import { Svg } from './../../../utiles/vectores'

class Clases {
  constructor({ Legend }) {
    this.lista = Legend[0].rules.map(regla => new Clase(regla))

    this.lista.forEach(({ svg }) => {
      svg.espacio = this.tamanioSimboloMayor
    })
  }

  get tamanioSimboloMayor() {
    return Math.max(...this.lista.map(({ svg }) => svg.tamanio))
  }
}

class Clase {
  visible = false

  constructor({ /*filter,*/ name, symbolizers, title }) {
    this.titulo = title || name

    const geometria = Object.keys(symbolizers[0])[0]
    const simbolo = symbolizers[0][geometria]

    this.svg = new Svg({
      estilo: simbolo.graphics ? simbolo.graphics[0] : simbolo,
      geometria,
      tamanio: Number(simbolo.size) || undefined,
    })
  }
}

export class GeoserverLeyenda extends GetLegendGraphic {
  constructor(parameters) {
    super(parameters)

    this._formato = 'application/json'
    this._legendOptions = undefined
    this._fuente = parameters.fuente
    this._estilo = parameters.estilo
  }

  get url() {
    const parametros = new URLSearchParams(
      ejecutarMetodoArrayEnObjeto(
        this.parametros,
        ([, valor]) => valor !== undefined && valor !== null,
        'filter'
      )
    )

    // return `${utils.urlService(this._fuente, this._servicio)}${this.parametrosEnFormatoURL}`
    return `${this._fuente}?${parametros.toString()}`
  }
}
</script>
