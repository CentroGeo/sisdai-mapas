import { describe, expect, it, vi } from 'vitest'
import SisdaiMapa from '@/componentes/mapa'
import SisdaiCapaVectorial from '@/componentes/capa/vectorial'
import SisdaiCapaXyz from '@/componentes/capa/xyz'
import plugin from '@/'

describe('Instalación como plugin', () => {
  it('debería registrar los componentes correctamente', () => {
    const mockVue = { component: vi.fn() }

    // Instalamos el plugin
    plugin.install(mockVue)

    // Verificamos que los componentes fueron registrados con el nombre correcto
    expect(mockVue.component).toHaveBeenCalledWith('SisdaiCapaVectorial', SisdaiCapaVectorial)
    expect(mockVue.component).toHaveBeenCalledWith('SisdaiCapaXyz', SisdaiCapaXyz)
    expect(mockVue.component).toHaveBeenCalledWith('SisdaiMapa', SisdaiMapa)

    // Limpieza del mock
    // mockVue.mockRestore()
  })
})
