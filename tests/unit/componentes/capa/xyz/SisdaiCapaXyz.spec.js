import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SisdaiCapaXyz from '@/componentes/capa/xyz'
import eventos from '@/componentes/capa/xyz/eventos'
import Mapa from '@/componentes/mapa/Mapa'
import { addResizeObserver } from '../../../utils'
import TileEventType from 'ol/source/TileEventType'

describe('SisdaiCapaXyz', () => {
  addResizeObserver()
  const mapa = new Mapa()
  const id = 'idCapaXyz'

  const wrapper = shallowMount(SisdaiCapaXyz, {
    props: { id },
    global: { provide: { mapa } }
  })
  // mapa.value = new Mapa('idMapa', document.createElement('div'))
  // mapa.setTarget(document.createElement('div'))

  it('agrega el identificador de la capa', () => {
    expect(wrapper.props().id).toBe(id)
    expect(wrapper.attributes()['sisdai-capa']).toBe(id)
  })

  it(`llama al evento ${eventos.alIniciarCargaTesela} e incrementa el contador de inicio del monitoreo de teselas`, async () => {
    wrapper.vm.source.dispatchEvent(TileEventType.TILELOADSTART)

    expect(wrapper.emitted()).toHaveProperty(eventos.alIniciarCargaTesela)
    expect(wrapper.vm.monitoreoCargaTeselas.inicio).toBe(1)

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty(eventos.alIniciarCarga)
  })

  it(`llama al evento ${eventos.alFinalizarCargaTesela} con el patrametro true e incrementa el contador de fin del monitoreo de teselas`, async () => {
    wrapper.vm.source.dispatchEvent(TileEventType.TILELOADEND)

    expect(wrapper.emitted()).toHaveProperty(eventos.alFinalizarCargaTesela)
    expect(wrapper.emitted(eventos.alFinalizarCargaTesela)[0]).toEqual([true])
    expect(wrapper.vm.monitoreoCargaTeselas.fin).toBe(1)

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty(eventos.alFinalizarCarga)
    expect(wrapper.emitted(eventos.alFinalizarCarga)[0]).toEqual([true])
  })

  it(`llama al evento ${eventos.alFinalizarCargaTesela} con el patrametro false e incrementa el contador de error del monitoreo de teselas`, async () => {
    // wrapper.vm.source.dispatchEvent(TileEventType.TILELOADSTART)
    wrapper.vm.monitoreoCargaTeselas.fin = 0
    await wrapper.vm.$nextTick()
    wrapper.vm.source.dispatchEvent(TileEventType.TILELOADERROR)

    expect(wrapper.emitted()).toHaveProperty(eventos.alFinalizarCargaTesela)
    expect(wrapper.emitted(eventos.alFinalizarCargaTesela)[1]).toEqual([false])
    expect(wrapper.vm.monitoreoCargaTeselas.error).toBe(1)

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty(eventos.alFinalizarCarga)
    expect(wrapper.emitted(eventos.alFinalizarCarga)[0]).toEqual([true])
  })
})
