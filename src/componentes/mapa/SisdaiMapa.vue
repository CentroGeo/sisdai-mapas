<script setup>
import {
  onMounted,
  provide,
  reactive,
  shallowRef,
  toRefs,
  useSlots,
  watch,
} from 'vue'
import Mapa from './Mapa'
import { panelesEnUso } from './utiles'
import propsMapa from './props'
import {
  AnimacionCarga,
  BotonAcercamiento,
  ContenedorVisAtribuciones,
} from './elementos'
import { GloboInformativo } from './elementos/info'
import eventos from './../capa/eventos'
import { MAPA_INYECTADO } from './../../utiles/identificadores'

const emits = defineEmits(Object.values(eventos))
const props = defineProps(propsMapa)
const { descripcion, vista } = toRefs(props)

const mapa = reactive(new Mapa(props.id, props.proyeccion))
mapa.asignarVista(vista.value)
// mapa.ajustarVista()
provide(MAPA_INYECTADO, mapa)

function emitirEventosCarga(nv) {
  if (nv) {
    emits(eventos.alIniciarCarga)
  } else {
    emits(eventos.alFinalizarCarga, !mapa.todasCapasConError)
  }
}
watch(() => mapa.capasCargando, emitirEventosCarga)

const refMapa = shallowRef(null)
onMounted(() => {
  mapa.setTarget(refMapa.value)
  mapa.ajustarVista()
})
</script>

<template>
  <div
    :sisdai-mapa="props.id"
    class="sisdai-mapa contenedor-vis borde-redondeado-8"
  >
    <p
      :id="`mapa-${props.id}-descripcion`"
      class="a11y-solo-lectura a11y-simplificada-ocultar"
    >
      {{ descripcion }}
    </p>
    <p class="a11y-simplificada-mostrar-inline m-3">
      {{ descripcion }}
    </p>

    <div
      class="contenedor-vis-paneles a11y-simplificada-ocultar"
      :class="panelesEnUso(useSlots())"
    >
      <div class="panel-encabezado-vis">
        <slot name="panel-encabezado-vis" />
      </div>

      <div class="panel-izquierda-vis">
        <slot name="panel-izquierda-vis" />
      </div>

      <!-- slot para las capas -->
      <slot />

      <div
        class="contenido-vis"
        ref="refMapa"
        tabindex="0"
      >
        <div
          class="sisdai-mapa-control contenedor-controles-vista ol-unselectable"
        >
          <BotonAcercamiento
            nombre="Acercar"
            pictograma="agregar"
            @click="mapa.acercar(1)"
          />
          <BotonAcercamiento
            nombre="Alejar"
            pictograma="restar"
            @click="mapa.acercar(-1)"
          />
          <BotonAcercamiento
            nombre="Centrar"
            pictograma="mapa-centro"
            @click="mapa.ajustarVista()"
          />
        </div>

        <GloboInformativo
          contenido="Soy un globo de información"
          :pixel="[10, 10]"
        />
      </div>

      <div class="panel-derecha-vis">
        <slot name="panel-derecha-vis" />
      </div>

      <div class="panel-pie-vis">
        <slot name="panel-pie-vis" />
      </div>

      <AnimacionCarga
        class="borde-t-redondeado-8"
        v-show="mapa.capasCargando"
      />
    </div>

    <!-- <AnimacionCarga class="borde-redondeado-8" v-show="mapa.capasCargando" /> -->
    <ContenedorVisAtribuciones />
  </div>
</template>

<style lang="scss">
@import 'ol/ol.css';
@import './../../estilos/Controles.scss';

.sisdai-mapa.contenedor-vis {
  .contenedor-vis-paneles {
    position: relative;
  }
}
</style>
