<script setup>
import MapEventType from 'ol/MapEventType'
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  shallowRef,
  toRefs,
  useSlots,
  watch,
} from 'vue'
import usarRegistroMapas from './../composables/usarRegistroMapas'
import eventos from './../eventos/mapa'
import { idAleatorio, stringifyIguales } from './../utiles'
import * as validaciones from './../utiles/validaciones'
import * as valoresPorDefecto from './../valores/mapa'
import ContenedorVisAtribuciones from './internos/ContenedorVisAtribuciones.vue'

const props = defineProps({
  /**
   * Recíbe los ID, separados por espacios, de los elementos que describen al mapa como título, descripciones cortas o largas.
   *
   * - Tipo: `String`
   * - Valor por defecto: `''`
   * - Reactivo: ✅
   *
   * > ℹ️ **Información:** Esta propiedad hace uso del atributo `aria-describedby` para establecer una relación entre el mapa y el texto que los describe.
   */
  elementosDescriptivos: {
    type: String,
    default: '',
  },

  /**
   * Define si se agrega la escala grafica en el mapa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `true`
   * - Reactivo: ✅
   */
  escalaGrafica: {
    type: Boolean,
    default: true,
    validator: valor => typeof valor === typeof Boolean(),
  },

  /**
   * Identificador único del mapa. Si no es definido se asignará un valor aleatorio.
   *
   * - Tipo: `String`
   * - Valor por defecto: Aleatorio
   * - Reactivo: ❌
   */
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   * PARA USO DE PRUEBA EN LA NAVEGACIÓN POR TECLADO,
   * LA INTENCIÓN ES QUE AL APROBAR LA NAVEGACIÓN POR TECLADO
   * ESTE PARÁMETRO Y SUS VALIDACIONES SE QUITEN PARA QUE
   * SEA USADA POR DEFECTO
   */
  navegacionTeclado: {
    type: Boolean,
    default: false,
  },

  /**
   * Objeto que define la vista del mapa. Revisa los detalles de la vista en la [sección vista](/comienza/vista.html) de esta documentación.
   *
   * - Tipo: `Object`
   * - Valor por defecto: `{ centro: [0, 0], zoom: 1.5 }`
   * - Reactivo: ✅
   */
  vista: {
    type: Object,
    default: () => valoresPorDefecto.vista,
    validator: validaciones.vista,
  },

  /**
   * Código de identificación SRS que define la proyección de la vista.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'EPSG:4326'`
   * - Reactivo: ❌
   *
   * > ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.
   *
   * > ⚠️ **Importante:** Las coordenadas y capas que integre en el componente deben coincidir con la `proyeccion` definida en el mapa.
   */
  proyeccion: {
    type: String,
    default: valoresPorDefecto.proyeccion,
  },
})

const emits = defineEmits(Object.values(eventos))
const slots = useSlots()
const refMapa = shallowRef(null)
const { elementosDescriptivos, escalaGrafica, vista } = toRefs(props)

/**
 * Permite acceder al mapa registrado sin usa `usarRegistroMapas().mapa(props.id)` en dónde se
 * ocupe el mapa.
 *
 * @returns {import("./../clases/Mapa").default}
 */
function mapa() {
  return usarRegistroMapas().mapa(props.id)
}

/**
 * Actualizar vista en el mapa registrado.
 */
watch(
  vista,
  nv => {
    const _nv = { ...valoresPorDefecto.vista, ...nv }
    mapa()?.asignarVista(_nv)

    if (_nv.ajustarVistaAlcambiarParametros) {
      mapa().ajustarVista()
    }
  },
  { deep: true }
)

/**
 * Objeto reactivo utilizado para evaluar en que momento el centro o zoom de la vista es diferente
 * a la anterior cada que se mueva el mapa.
 */
const estadoVistaMovida = reactive({
  centro: undefined,
  zoom: undefined,
})

/**
 * Desencadena los emits requeridos en cada movimiento
 * @param {Object} e
 */
function olMoveend({ map }) {
  emits(eventos.alMoverVista, map.getView())

  if (stringifyIguales(map.getView().getCenter(), estadoVistaMovida.centro)) {
    estadoVistaMovida.centro = map.getView().getCenter()
    emits(eventos.alCambiarCentro, estadoVistaMovida.centro)
  }

  // const nuevoZoom = Math.round(e.map.getView().getZoom() * 100) / 100
  if (map.getView().getZoom() !== estadoVistaMovida.zoom) {
    estadoVistaMovida.zoom = map.getView().getZoom()
    emits(eventos.alCambiarZoom, estadoVistaMovida.zoom)
  }
}

/**
 * Asigna al canvas valores de accesibilidad ARIA.
 * @param {String} describedby
 */
function ariaCanvas(describedby) {
  mapa()
    .busquedaPromesa(_mapa => _mapa.getViewport().querySelector('canvas'))
    .then(canvas => {
      canvas.setAttribute('aria-label', 'Mapa interactivo')
      canvas.setAttribute('aria-describedby', describedby)
    })
}

onMounted(() => {
  // console.log('SisdaiMapa')
  usarRegistroMapas().registrarMapa(
    props.id,
    refMapa.value,
    props.proyeccion,
    emits
  )
  mapa().asignarVista({ ...valoresPorDefecto.vista, ...vista.value })
  mapa().ajustarVista()
  mapa().on(MapEventType.MOVEEND, olMoveend)

  ariaCanvas(elementosDescriptivos.value)
  watch(elementosDescriptivos, ariaCanvas)
})

onUnmounted(() => {
  mapa().un(MapEventType.MOVEEND, olMoveend)
  usarRegistroMapas().borrarMapa(props.id)
})

defineExpose({
  /**
   * Permite descargar la vista actual del mapa, con las capas visibles y zoom mostrado en
   * pantalla, sin controles. El formato de descargá es PNG.
   * @param {String} nombreImagen Nombre del archivo que se descargara del navegador (no debe
   * incluir extensión).
   */
  exportarImagen: nombreImagen => {
    mapa().exportarImagen(nombreImagen)
  },

  /**
   * Ajusta la vista del mapa a los valores iniciales de la propiedad vista mediante el control
   * AjustarVista.
   */
  ajustarVista: () => {
    mapa().ajustarVista()
  },
})

/**
 * Variable computada para el asignar la regla css `display` al elemento de la escala gráfica.
 */
const escalaGraficaVisible = computed(() =>
  escalaGrafica.value ? 'block' : 'none'
)

const focoEnMapa = ref(false)
const navegacionTecladoVisible = ref('none')

watch(focoEnMapa, nv => {
  if (!nv) {
    setTimeout(() => {
      if (!focoEnMapa.value) {
        // console.log('se ha quitado el foco, quitar control')
        navegacionTecladoVisible.value = 'none'
        // mapa().navegacionTeclado.desactivar()
      }
    }, 2000)
  }
})

function alTeclear({ key }) {
  switch (key.toLowerCase()) {
    case 'tab':
      if (focoEnMapa.value) {
        // if (key === 'Tab' && focoEnMapa.value) {
        // console.log('hacer visible el control')
        if (props.navegacionTeclado) {
          navegacionTecladoVisible.value = 'block'
        }
      }
      break

    case valoresPorDefecto.teclasAtajo.AJUSTAR:
      mapa().buscarControl('AjustarVista').ajustarVista()
      break

    case valoresPorDefecto.teclasAtajo.NORTE:
      mapa().getView().setRotation(0)
      break

    case valoresPorDefecto.teclasAtajo.ROTAR_IZQUIERDA:
      /**
       * @see https://openlayers.org/en/latest/examples/full-screen-drag-rotate-and-zoom.html
       */
      mapa()
        .getView()
        .setRotation(mapa().getView().getRotation() + Math.PI / 8)
      break

    case valoresPorDefecto.teclasAtajo.ROTAR_DERECHA:
      mapa()
        .getView()
        .setRotation(mapa().getView().getRotation() - Math.PI / 8)
      break
  }
}

const paneles = ['encabezado', 'izquierda', 'derecha', 'pie']
function panelesEnUso() {
  // return !!slots[name]
  return paneles
    .filter(panel => !!slots[`panel-${panel}-vis`])
    .map(panel => `con-panel-${panel}-vis`)
}
</script>

<template>
  <div
    :sisdai-mapa="id"
    class="sisdai-mapa contenedor-vis2 borde-redondeado-8"
    :class="panelesEnUso()"
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
      @focusin="focoEnMapa = true"
      @focusout="focoEnMapa = false"
      @keydown="alTeclear"
    />

    <div class="panel-derecha-vis">
      <slot name="panel-derecha-vis" />
    </div>

    <div class="panel-pie-vis">
      <slot name="panel-pie-vis" />
    </div>

    <!-- <SisdaiCargando /> -->
    <ContenedorVisAtribuciones />
  </div>
</template>

<style lang="scss">
@import './../estilos/Accesibilidad.scss';
@import './../estilos/Controles.scss';
@import './../estilos/GloboInfo.scss';
@import './../estilos/SisdaiMapa.scss';

.sisdai-mapa-control {
  &-escala-grafica {
    display: v-bind(escalaGraficaVisible);
  }

  &-navegacion-teclado {
    display: v-bind(navegacionTecladoVisible);
  }
}
</style>
