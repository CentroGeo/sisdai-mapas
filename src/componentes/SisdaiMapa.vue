<script setup>
import { onMounted, onUnmounted, reactive, ref, toRefs, watch } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import AttributionControl from 'ol/control/Attribution'
import { eventos, props } from './../scripts/mapa'
import vistaMapaDefault from './../defaults/vistaMapa'
import { extensionEsValida } from './../utiles'
import usarCapasRegistradas from './../composables/usarCapasRegistradas'
import ControlZoomPersonalizado from './../controles/ZoomPersonalizado'
import ControlAjusteVista from './../controles/AjusteVista'
import ControlEscalaGrafica from './../controles/EscalaGrafica'
import BotonConacyt from './externos/BotonConacyt.vue'
import VistaCarga from './externos/VistaCarga.vue'
import AjusteVista from './../controles/AjusteVista'
import exportarMapaComoImagen from './../scripts/mapa/ExportarImagen'
import GloboInformativo from '../componentes/info/GloboInformativo'

// eslint-disable-next-line
const propsSetup = defineProps(props)
const { ajustarVistaPorCapasVisibles, escalaGrafica, vista } =
  toRefs(propsSetup)

// eslint-disable-next-line
const emitsSetup = defineEmits(Object.values(eventos))

/**
 * Referencia al elemento html contenedor del mapa
 */
const refSisdaiMapa = ref(null)

/**
 * Objeto que contendrá la instancia del mapa, declararlo fuera de la función composable hace que
 * no se genere una nueva variable del mapa cada que se utilice el composable
 */
const olMapa = ref(undefined)

/**
 *
 */
function asignarProps() {
  const vistaMapa = { ...vistaMapaDefault, ...vista.value }
  vistaMapa.tipo = extensionEsValida(vistaMapa.extension)
    ? 'extension'
    : 'centro'
  vistaMapa.ajustePorCapas = ajustarVistaPorCapasVisibles.value

  olMapa.value.set('vista', vistaMapa)
  olMapa.value.setView(
    new View({
      center: vistaMapa.centro,
      zoom: vistaMapa.zoom,
      projection: propsSetup.proyeccion,
    })
  )

  olMapa.value.on('moveend', ({ map }) => {
    const zoomRedondeado = Math.round(map.getView().getZoom() * 100) / 100
    if (Number(vista.value.zoom) !== zoomRedondeado) {
      emitsSetup(eventos.alCambiarZoom, zoomRedondeado)
    }
  })
}

/**
 * Objeto reactivo con las propiedades del Globo de información
 */
const globoInfo = reactive({
  visible: false,
  ubicacion: [0, 0],
  contenido: undefined,
})

function procesarContenidoGloboInfo(feature, contenido) {
  return typeof contenido === 'function'
    ? contenido(feature.getProperties())
    : contenido
}

function buscarFeatureEnPixel(pixel) {
  return olMapa.value.forEachFeatureAtPixel(pixel, (feature, layer) => {
    globoInfo.visible = true
    globoInfo.ubicacion = pixel
    globoInfo.contenido = procesarContenidoGloboInfo(
      feature,
      layer.get('globoInfo')
    )

    olMapa.value.getTargetElement().style.cursor = 'pointer'
    return true
  })
}

function invocarGloboInfo() {
  olMapa.value.on('pointermove', ({ originalEvent }) => {
    const pixel = olMapa.value.getEventPixel(originalEvent)

    if (buscarFeatureEnPixel(pixel) === undefined) {
      globoInfo.visible = false
      olMapa.value.getTargetElement().style.cursor = ''
    }
  })

  olMapa.value.getTargetElement().addEventListener('pointerleave', () => {
    globoInfo.visible = false
    olMapa.value.getTargetElement().style.cursor = ''
  })
}

const {
  agregarTodoALMapa: agregarCapasRegistradas,
  hayCapasCargadorVisibleProcesando: verCargador,
  limpiarRegistro: limpiarCapasRegistradas,
} = usarCapasRegistradas()

/**
 * Creación del elemento mapa con atributos definidos.
 * @param {HTMLDivElement|String} target elemento o id del elemento html que contendrá el mapa.
 */
function crearMapa(target) {
  // Instanciamiento del maapa como objeto de la calse ol/Map
  return new Map({
    target,
    layers: [],
    controls: [
      new ControlZoomPersonalizado(),
      new ControlAjusteVista(emitsSetup),
      new AttributionControl({
        collapsible: false,
      }),
    ],
  })
}

onMounted(() => {
  olMapa.value = crearMapa(refSisdaiMapa.value)
  asignarProps()
  invocarGloboInfo()
  alternarEscalaGrafica(propsSetup.escalaGrafica)
  agregarCapasRegistradas(olMapa.value)
})

onUnmounted(() => {
  limpiarCapasRegistradas()
  olMapa.value = undefined
})

/**
 * Devuelve un control por su nombre registrado
 * @param {String} nombreDelControl
 * @returns {import("ol/control/Control.js").default|undefined} olControl
 */
function conseguirControl(nombreDelControl) {
  if (olMapa.value) {
    return olMapa.value
      .getControls()
      .getArray()
      .find(olControl => olControl.nombre === nombreDelControl)
  }
}

/**
 * Quita un control de openlayers en el mapa.
 * @param {import("ol/control/Control.js").default} olControl
 */
function removerControl(olControl) {
  if (olMapa.value) {
    olMapa.value.removeControl(olControl)
  }
}

/**
 * Quita o agrega el control de escala gáfica en el mapa dependiendo del parámetro boleano.
 * @param {Boolean} visible
 */
function alternarEscalaGrafica(visible) {
  if (visible) {
    agregarControl(new ControlEscalaGrafica())
  } else {
    removerControl(conseguirControl(ControlEscalaGrafica.nombre))
  }
}
watch(escalaGrafica, alternarEscalaGrafica)

/**
 * Agrega un control de openlayers en el mapa.
 * @param {import("ol/control/Control.js").default} olControl
 */
function agregarControl(olControl) {
  if (olMapa.value) {
    olMapa.value.addControl(olControl)
  }
}

/**
 * Ajusta la vista del mapa a los valores definidos en la propiedad vista.
 */
function ajustarVista() {
  const controlAjusteVista = conseguirControl(AjusteVista.nombre)
  controlAjusteVista.ajustar()
}

/**
 * Permite descargar la vista actual del mapa, con las capas visibles y zoom mostrado en
 * pantalla, sin controles. El formato de descargá es PNG.
 * @param {String} nombreCaptura nombre del archivo que se descargara del navegador (no debe incluir extensión).
 */
function exportarImagen(nombreCaptura) {
  exportarMapaComoImagen(olMapa.value, nombreCaptura)
}

/**
 * Actualiza la coordenada centrica del mapa
 * @param {Number} centro nueva coordenada centrica
 */
function cambiarCentro(centro) {
  if (olMapa.value) {
    olMapa.value.getView().setCenter(centro)
  }
}
watch(() => vista.value.centro, cambiarCentro)

/**
 * Cambiar la extension, esto proboca que el mapa ajuste la vista con la extención actual
 * en caso de ser valida.
 * @param {Array<Number>} extension
 */
function cambiarExtension(nuevaExtension) {
  olMapa.value.get('vista').tipo = extensionEsValida(nuevaExtension)
    ? 'extension'
    : 'centro'
  olMapa.value.get('vista').extension = nuevaExtension
  ajustarVista()
}
// watch(extension, cambiarExtension)
watch(() => vista.value.extension, cambiarExtension)

/**
 * Actualiza el nivel de zoom en el mapa.
 * @param {Number} zoom nuevo bnivel de zoom
 */
function cambiarZoom(zoom) {
  if (olMapa.value) {
    olMapa.value.getView().setZoom(zoom)
  }
}
watch(() => vista.value.zoom, cambiarZoom)

// eslint-disable-next-line
defineExpose({
  exportarImagen,
  ajustarVista,
  ajustarVistaPorCapasVisibles: undefined,
})
</script>

<template>
  <div class="sisdai-mapa-contenedor borde borde-redondeado-8">
    <div
      ref="refSisdaiMapa"
      class="sisdai-mapa"
    >
      <GloboInformativo
        v-show="globoInfo.visible"
        :ubicacion="globoInfo.ubicacion"
        :contenido="globoInfo.contenido"
      />
    </div>

    <VistaCarga v-show="verCargador" />

    <!-- Permite ingresar etiquetas dentro de etiqueta sisdai-mapa -->
    <slot />

    <BotonConacyt />
  </div>
</template>

<!-- Agregue el atributo "scoped" para limitar CSS solo a este componente -->
<style lang="scss" scoped>
@import './../estilos/mapa.scss';
</style>
