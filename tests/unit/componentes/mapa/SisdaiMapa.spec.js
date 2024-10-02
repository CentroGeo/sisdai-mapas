import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SisdaiMapa from '@/componentes/mapa'
import { addResizeObserver } from './../../utils'

describe('SisdaiMapa', () => {
  addResizeObserver()
  const wrapper = shallowMount(SisdaiMapa, {
    slots: {
      'panel-encabezado-vis': 'Contenido en el encabezado',
      'panel-izquierda-vis': 'Contenido a la izquierda',
      'panel-derecha-vis': 'Contenido a la derecha',
      'panel-pie-vis': 'Contenido en el pie'
    }
  })

  it('debería renderiza el contenedor del mapa', () => {
    expect(wrapper.find('.contenido-vis').exists()).toBe(true)
  })

  it('agrega automática de las clases de los paneles al usar slots', () => {
    const contenedorVisPaneles = wrapper.find('.contenedor-vis-paneles')

    expect(contenedorVisPaneles.classes()).toContain('con-panel-encabezado-vis')
    expect(contenedorVisPaneles.classes()).toContain('con-panel-izquierda-vis')
    expect(contenedorVisPaneles.classes()).toContain('con-panel-derecha-vis')
    expect(contenedorVisPaneles.classes()).toContain('con-panel-pie-vis')
  })
})
