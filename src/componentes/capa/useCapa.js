import { getRenderPixel } from 'ol/render.js'
import EventTypeRender from 'ol/render/EventType'
import { inject, onMounted, onUnmounted, toRefs, watch } from 'vue'
import { MAPA_INYECTADO } from '../../utiles/identificadores'

/**
 *
 * @param {import("ol/layer/Base.js").default} capa
 * @param {import("./props.js").default} props
 */
export default function useCapa(capa, props) {
  const mapa = inject(MAPA_INYECTADO)
  const { lado, opacidad, posicion, visible } = toRefs(props)

  capa.setOpacity(opacidad.value)
  watch(opacidad, nuevaOpacidad => capa.setOpacity(nuevaOpacidad))

  capa.setZIndex(posicion.value)
  watch(posicion, nuevaPosicion => capa.setZIndex(nuevaPosicion))

  capa.setVisible(visible.value)
  watch(visible, nuevaVisibilidad => capa.setVisible(nuevaVisibilidad))

  watch(lado, () => mapa.render())

  // { type, target, inversePixelTransform, frameState, context }
  capa.on(EventTypeRender.PRERENDER, event => {
    if (isNaN(mapa.dividir)) return
    if (!(props.lado === 'izquierda' || props.lado === 'derecha')) return

    const [ancho, alto] = mapa.getSize()
    const corteVertical = ancho * (Number(mapa.dividir) / 100)

    const inicio = lado.value === 'derecha' ? corteVertical : 0
    const fin = lado.value === 'derecha' ? ancho : corteVertical

    const [izq1, arr1] = getRenderPixel(event, [inicio, 0])
    const [izq2, aba1] = getRenderPixel(event, [inicio, alto])
    const [der2, aba2] = getRenderPixel(event, [fin, alto])
    const [der1, arr2] = getRenderPixel(event, [fin, 0])

    const { context } = event

    context.save()
    context.beginPath()
    context.moveTo(izq1, arr1)
    context.lineTo(izq2, aba1)
    context.lineTo(der2, aba2)
    context.lineTo(der1, arr2)
    context.closePath()
    context.clip()
  })
  capa.on(EventTypeRender.POSTRENDER, ({ context }) => {
    if (isNaN(mapa.dividir)) return
    if (!(props.lado === 'izquierda' || props.lado === 'derecha')) return
    // console.log(type)

    context.restore()
  })

  onMounted(() => mapa.addLayer(capa))
  onUnmounted(() => mapa.quitarCapa(props.id))
}
