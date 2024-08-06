import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SisdaiCapaXyz from '@/componentes/capa/xyz'
import { addResizeObserver } from '../../../utils'
import { ref } from 'vue'
import { Map } from 'ol'

describe('SisdaiCapaXyz', () => {
  addResizeObserver()

  it('Integración de una capa xyz en una insrtancia del mapa', () => {
    const mapa = ref(null)

    shallowMount(SisdaiCapaXyz, {
      global: {
        provide: {
          mapa
        }
      }
    })

    mapa.value = new Map()

    console.log(mapa.value.getAllLayers())
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
