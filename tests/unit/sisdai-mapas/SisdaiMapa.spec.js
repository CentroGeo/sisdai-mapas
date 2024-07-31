import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SisdaiMapa from '@/componentes/mapa'

describe('SisdaiMapa', () => {
  it('Agragción automática de las clases de los paneles al usar slots', () => {
    const wrapper = shallowMount(SisdaiMapa, {
      slots: {
        'panel-encabezado-vis': 'Contenido en el encabezado',
        'panel-izquierda-vis': 'Contenido a la izquierda',
        'panel-derecha-vis': 'Contenido a la derecha',
        'panel-pie-vis': 'Contenido en el pie'
      }
    })

    console.log(wrapper.html())

    const contenedorVisPaneles = wrapper.find('.contenedor-vis-paneles')

    // console.log(contenedorVisPaneles.classes())
    expect(contenedorVisPaneles.classes()).toContain('con-panel-encabezado-vis')
    expect(contenedorVisPaneles.classes()).toContain('con-panel-izquierda-vis')
    expect(contenedorVisPaneles.classes()).toContain('con-panel-derecha-vis')
    expect(contenedorVisPaneles.classes()).toContain('con-panel-pie-vis')
  })
})
