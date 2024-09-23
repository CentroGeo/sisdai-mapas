import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SisdaiCapaXyz from '@/componentes/capa/xyz'
import Mapa from '@/componentes/mapa/Mapa'
import { addResizeObserver } from '../../../utils'
import { ref } from 'vue'

describe('SisdaiCapaXyz', () => {
  addResizeObserver()

  it('Integración de una capa xyz en una insrtancia del mapa', () => {
    const mapa = ref(null)

    const wrapper = shallowMount(SisdaiCapaXyz, {
      global: {
        provide: {
          mapa
        }
      }
    })

    mapa.value = new Mapa()

    expect(wrapper.attributes()['sisdai-capa']).toBe(wrapper.props().id)
  })

  // it('Integración de una capa xyz en una insrtancia del mapa', () => {
  //   const wrapper = shallowMount(SisdaiMapa, {
  //     slots: {
  //       default: SisdaiCapaXyz
  //     }
  //   })

  //   console.log(wrapper.html())
  // })
})
