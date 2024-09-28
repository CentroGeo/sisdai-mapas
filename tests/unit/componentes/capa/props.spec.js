import { describe, expect, it, vi } from 'vitest'
import props from '@/componentes/capa/props'
import SisdaiCapaXyz from '@/componentes/capa/xyz'
import { shallowMount } from '@vue/test-utils'
import { addResizeObserver } from '../../utils'
import { ref } from 'vue'

describe('Props Capa', () => {
  addResizeObserver()
  const idAleatorio = props.id.default()

  it('genera un identificador con valor aleatoreo por defecto', () => {
    const mockIdAleatorio = vi.fn(() => idAleatorio)
    vi.spyOn(props.id, 'default').mockImplementation(mockIdAleatorio)
    const wrapper = shallowMount(SisdaiCapaXyz, {
      global: { provide: { mapa: ref(null) } }
    })

    expect(wrapper.props().id).toEqual(idAleatorio)
    expect(mockIdAleatorio).toHaveBeenCalled()
  })
})
