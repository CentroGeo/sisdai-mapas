import { inject, onMounted, onUnmounted, toRefs, watch } from 'vue'
import { MAPA_INYECTADO } from '../../utiles/identificadores'

/**
 *
 * @param {import("ol/layer/Base.js").default} capa
 * @param {*} props
 */
export default function useCapa(capa, props) {
  const mapa = inject(MAPA_INYECTADO)
  const { opacidad, posicion, visible } = toRefs(props)

  capa.setOpacity(opacidad.value)
  watch(opacidad, nuevaOpacidad => capa.setOpacity(nuevaOpacidad))

  capa.setZIndex(posicion.value)
  watch(posicion, nuevaPosicion => capa.setZIndex(nuevaPosicion))

  capa.setVisible(visible.value)
  watch(visible, nuevaVisibilidad => capa.setVisible(nuevaVisibilidad))

  onMounted(() => mapa.addLayer(capa))
  onUnmounted(() => mapa.quitarCapa(props.id))
}
