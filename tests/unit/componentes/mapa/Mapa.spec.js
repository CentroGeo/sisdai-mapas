import Mapa from '@/componentes/mapa/Mapa'
import { describe, it, expect, vi } from 'vitest'
import { addResizeObserver } from '../../utils'

describe('Mapa', () => {
  addResizeObserver()

  // Configuración inicial
  const id = 'test-id'
  const target = 'test-target'
  const proyeccion = 'EPSG:4326'

  // Crear la instancia del mapa
  const mapa = new Mapa(id, proyeccion)

  it('debería crear una instancia del mapa correctamente', () => {
    // Comprobamos que se cree la instancia correctamente
    expect(mapa).toBeInstanceOf(Mapa)
    expect(mapa.id).toBe(id)
  })

  it('debería agregar atributos aria al canvas', async () => {
    // Mock para simular que el canvas existe
    const mockCanvas = {
      setAttribute: vi.fn()
    }
    const mockViewport = {
      querySelector: vi.fn().mockReturnValue(mockCanvas)
    }
    mapa.getViewport = vi.fn().mockReturnValue(mockViewport)

    // Ejecutar la función async
    await mapa.agregarAtributosAriaCanvas()

    // Verificar que se hayan agregado los atributos correctos al canvas
    expect(mockCanvas.setAttribute).toHaveBeenCalledWith('aria-label', 'Mapa interactivo')
    expect(mockCanvas.setAttribute).toHaveBeenCalledWith(
      'aria-describedby',
      `mapa-${id}-descripcion`
    )
  })
})
