import { describe, expect, it, vi } from 'vitest'
import SisdaiMapa from '@/componentes/mapa'
import SisdaiCapaVectorial from '@/componentes/capa/vectorial'
import SisdaiCapaWms from '@/componentes/capa/wms'
import SisdaiCapaXyz from '@/componentes/capa/xyz'
import plugin from '@/'

describe('Instalación como plugin', () => {
  it('debería registrar los componentes correctamente', () => {
    const mockVue = { component: vi.fn() }

    plugin.install(mockVue)

    expect(mockVue.component).toHaveBeenCalledWith('SisdaiMapa', SisdaiMapa)
    expect(mockVue.component).toHaveBeenCalledWith(
      'SisdaiCapaVectorial',
      SisdaiCapaVectorial
    )
    expect(mockVue.component).toHaveBeenCalledWith(
      'SisdaiCapaWms',
      SisdaiCapaWms
    )
    expect(mockVue.component).toHaveBeenCalledWith(
      'SisdaiCapaXyz',
      SisdaiCapaXyz
    )
  })
})
