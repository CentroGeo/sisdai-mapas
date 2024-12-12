import { describe, expect, it, vi } from 'vitest'
import * as utiles from '@/utiles'
import {
  acercamiento,
  arregloSinVacios,
  centro,
  extension,
  extensionMargen,
  vista,
} from '@/componentes/mapa/validaciones'

describe('Validaciones del mapa', () => {
  const consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  describe('arregloSinVacios', () => {
    it('debería devolver true si el arreglo es válido', () => {
      const resultado = arregloSinVacios([1, 2, 3, 4], 'Error', 4)
      expect(resultado).toBe(true)
    })

    it('debería devolver false si el arreglo contiene NaN, null o undefined', () => {
      const resultado = arregloSinVacios([1, NaN, 3], 'Error', 3)
      expect(resultado).toBe(false)
      expect(consoleErrorMock).toHaveBeenCalledWith('Error')
      consoleErrorMock.mockRestore()
    })
  })

  describe('extension', () => {
    it('debería devolver true si la extensión es válida', () => {
      vi.spyOn(utiles, 'valorarArregloNumerico').mockReturnValue([1, 2, 3, 4])
      const resultado = extension([1, 2, 3, 4])
      expect(resultado).toBe(true)
    })

    it('debería devolver false si la extensión no es válida', () => {
      vi.spyOn(utiles, 'valorarArregloNumerico').mockReturnValue([1, 2])
      const resultado = extension([1, 2])
      expect(resultado).toBe(false)
    })
  })

  describe('extensionMargen', () => {
    it('debería devolver true si el margen es válido como número', () => {
      vi.spyOn(utiles, 'esNuemro').mockReturnValue(true)
      const resultado = extensionMargen(10)
      expect(resultado).toBe(true)
    })

    it('debería devolver false si el margen no es válido', () => {
      vi.spyOn(utiles, 'esNuemro').mockReturnValue(false)
      vi.spyOn(utiles, 'valorarArregloNumerico').mockReturnValue([NaN, 1])
      const resultado = extensionMargen([NaN, 1])
      expect(resultado).toBe(false)
    })
  })

  describe('acercamiento', () => {
    it('debería devolver true si el acercamiento es válido', () => {
      const resultado = acercamiento(10)
      expect(resultado).toBe(true)
    })

    it('debería devolver false si el acercamiento es fuera del rango', () => {
      const consoleErrorMock = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const resultado = acercamiento(25)
      expect(resultado).toBe(false)
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'LA PROPIEDAD "acercamiento" DE LA VISTA DEL MAPA DEBE SER ENTRE 1 Y 22'
      )
      consoleErrorMock.mockRestore()
    })
  })

  describe('centro', () => {
    it('debería devolver true si el centro es válido', () => {
      vi.spyOn(utiles, 'valorarArregloNumerico').mockReturnValue([1, 2])
      const resultado = centro([1, 2])
      expect(resultado).toBe(true)
    })

    it('debería devolver false si el centro no es válido', () => {
      vi.spyOn(utiles, 'valorarArregloNumerico').mockReturnValue([1, NaN])
      const resultado = centro([1, NaN])
      expect(resultado).toBe(false)
    })
  })

  describe('vista', () => {
    it('debería devolver true si la vista es válida', () => {
      vi.spyOn(utiles, 'valorarArregloNumerico').mockReturnValue([1, 2, 3, 4])
      const resultado = vista({
        extension: [1, 2, 3, 4],
        acercamiento: 10,
        centro: [1, 2],
      })
      expect(resultado).toBe(true)
    })

    // it('debería devolver false si la vista no es válida', () => {
    //   vi.spyOn(utiles, 'valorarArregloNumerico').mockReturnValue([1, 2])
    //   const resultado = vista({ extension: [1, 2] })
    //   console.log(resultado)

    //   expect(resultado).toBe(false)
    // })
  })
})
