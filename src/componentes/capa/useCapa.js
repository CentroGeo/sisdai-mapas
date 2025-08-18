import { getRenderPixel } from 'ol/render.js'
import EventTypeRender from 'ol/render/EventType'
import { inject, onMounted, onUnmounted, toRaw, toRefs, watch } from 'vue'
import { MAPA_INYECTADO } from '../../utiles/identificadores'

/**
 *
 * @param {import("ol/layer/Base.js").default} capa
 * @param {import("./props.js").default} props
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

  // const { dividir } = toRefs(mapa)
  // watch(dividir, nv => console.log(nv))

  // { type, target, inversePixelTransform, frameState, context }
  capa.on(EventTypeRender.PRERENDER, event => {
    if (isNaN(mapa.dividir)) return
    if (props.lado === undefined) return

    const [ancho, alto] = mapa.getSize()
    const corteVertical = ancho * (Number(mapa.dividir) / 100)
    const [izq1, arr1] = getRenderPixel(event, [corteVertical, 0])
    const [izq2, aba1] = getRenderPixel(event, [corteVertical, alto])
    const [der2, aba2] = getRenderPixel(event, [ancho, alto])
    const [der1, arr2] = getRenderPixel(event, [ancho, 0])

    const tamanioMapa = mapa.getSize()
    const nuevoAnchoCapa = tamanioMapa[0] * (Number(mapa.dividir) / 100)
    const tl = getRenderPixel(event, [nuevoAnchoCapa, 0])
    const bl = getRenderPixel(event, [nuevoAnchoCapa, tamanioMapa[1]])
    const br = getRenderPixel(event, tamanioMapa)
    const tr = getRenderPixel(event, [tamanioMapa[0], 0])
    console.log(event.type, nuevoAnchoCapa, toRaw(tamanioMapa), tl, tr, bl, br)
    const { context } = event

    console.log('moveTo', [tl[0], tl[1]], corteVertical, 0)
    console.log('lineTo', [bl[0], bl[1]], corteVertical, alto)
    console.log('lineTo', [br[0], br[1]], ancho, alto)
    console.log('lineTo', [tr[0], tr[1]], ancho, 0)

    context.save()
    context.beginPath()
    // context.moveTo(tl[0], tl[1])
    // context.lineTo(bl[0], bl[1])
    // context.lineTo(br[0], br[1])
    // context.lineTo(tr[0], tr[1])

    context.moveTo(izq1, arr1)
    context.lineTo(izq2, aba1)
    context.lineTo(der2, aba2)
    context.lineTo(der1, arr2)
    context.closePath()
    context.clip()
  })
  capa.on(EventTypeRender.POSTRENDER, ({ context }) => {
    if (isNaN(mapa.dividir)) return
    if (props.lado === undefined) return
    // console.log(type)

    context.restore()
  })

  onMounted(() => mapa.addLayer(capa))
  onUnmounted(() => mapa.quitarCapa(props.id))
}
