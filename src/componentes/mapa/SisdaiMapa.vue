<script setup>
import {
  onMounted,
  onUnmounted,
  provide,
  reactive,
  shallowRef,
  toRefs,
  useSlots,
  watch,
} from 'vue'

import MapEventType from 'ol/MapEventType'

import { MAPA_INYECTADO } from './../../utiles/identificadores'
import eventos from './eventos'
import Mapa from './Mapa'
import _props from './props'
import { panelesEnUso } from './utiles'

import { ControlesAcercamiento } from './controles'
import {
  // InstruccionTeclado,
  CuadroInformativo,
  // AnimacionCarga,
  VisAtribuciones,
} from './elementos'

import 'ol/ol.css'
// import PruebaMovimiento from './PruebaMovimiento.vue'

const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const mapa = reactive(new Mapa(props))
provide(MAPA_INYECTADO, mapa)

const { descripcion, dividir, escalaGrafica, vista } = toRefs(props)
watch(vista, nv => (mapa.vista = nv))
watch(dividir, nv => {
  mapa.dividir = nv
  mapa.render()
})

// function emitirEventosCarga(nv) {
//   if (nv) {
//     emits(eventos.alIniciarCarga)
//   } else {
//     emits(eventos.alFinalizarCarga, !mapa.todasCapasConError)
//   }
// }
// watch(() => mapa.capasCargando, emitirEventosCarga)

function alMoverVista({ map }) {
  const vista = map.getView()

  emits(eventos.alMoverVista, {
    acercamiento: vista.getZoom(),
    centro: vista.getCenter(),
    vista,
  })
}

const refMapa = shallowRef(null)
onMounted(() => {
  mapa.setTarget(refMapa.value)
  mapa.vista = props.vista
  // mapa.ajustarVista()
  mapa.on(MapEventType.MOVEEND, alMoverVista)
})

onUnmounted(() => {
  mapa.un(MapEventType.MOVEEND, alMoverVista)
})

defineExpose(mapa)
</script>

<template>
  <div
    :sisdai-mapa="props.id"
    class="sisdai-mapa contenedor-vis borde-redondeado-8"
  >
    <div
      class="contenedor-vis-paneles"
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

      <div class="contenido-vis">
        <p
          :id="`mapa-${props.id}-descripcion`"
          class="a11y-solo-lectura"
        >
          {{ descripcion }}
        </p>
        <p class="a11y-simplificada-mostrar-inline">{{ descripcion }}</p>

        <!-- <PruebaMovimiento /> -->
        <div
          class="mapa"
          :class="{ 'sin-escala-grafica': !escalaGrafica }"
          ref="refMapa"
          tabindex="0"
        />

        <!-- <InstruccionTeclado /> -->
        <ControlesAcercamiento :eventos="emits" />
        <CuadroInformativo />
        <!-- <GloboInformativo /> -->
      </div>

      <div class="panel-derecha-vis">
        <slot name="panel-derecha-vis" />
      </div>

      <div class="panel-pie-vis">
        <slot name="panel-pie-vis" />
      </div>

      <!-- <AnimacionCarga
        class="borde-t-redondeado-8"
        v-show="mapa.capasCargando"
      /> -->
    </div>

    <VisAtribuciones />
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa.contenedor-vis {
  .contenedor-vis-paneles {
    position: relative;
  }

  .contenido-vis > .mapa {
    height: 100%;
  }
}

.a11y-simplificada .sisdai-mapa.contenedor-vis .contenedor-vis-paneles {
  min-height: fit-content;

  .contenido-vis {
    min-height: fit-content;
    > .mapa,
    .sisdai-mapa-control {
      display: none;
    }
  }
}
</style>

<style lang="scss">
.sisdai-mapa {
  .sisdai-mapa-control {
    --margen: 16px;
    --alto-boton: 40px;
    --ancho-boton: 40px;
    --espacio-entre-botones: 4px;

    position: absolute;
    z-index: 1;
    > button {
      height: var(--alto-boton);
      width: var(--ancho-boton);
      > span {
        margin: auto;
      }
    }
  }

  .sin-escala-grafica .sisdai-mapa-control-escala-grafica {
    display: none;
  }

  .sisdai-mapa-control-escala-grafica {
    .ol-scale-bar-inner {
      .ol-scale-text {
        bottom: unset;
        color: transparent;
        text-shadow: none;
        &:before {
          content: 'Escala ';
        }
      }
      .ol-scale-step-marker {
        height: 10px;
        top: 0px !important;
      }
      .ol-scale-singlebar {
        height: 3px;
        top: 8px;
      }
      .ol-scale-step-text {
        bottom: 10px;
        font-size: 11px;
      }
      div > .ol-scale-step-marker {
        top: -2px !important;
      }
    }
  }
}
</style>
