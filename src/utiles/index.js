// This file is part of sisdai-mapas.
//
//   sisdai-mapas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-mapas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.


/**
 * @module utiles/index
 */

/**
 * Devuelve una cadena de texto aleatoreo.
 * @returns {String}
 */
export function idAleatorio() {
  return Math.random().toString(36).substring(2)
}

/**
 *
 * @param {Array} extension
 * @returns
 */
export function extensionEsValida(extension) {
  const _extension = validarExtension(extension)
  if (_extension === undefined) return false

  return Boolean(Number(_extension[0]) !== 0 && Number(_extension[3]) !== 0)
}

/**
 *
 * @param {*} extension
 * @returns
 */
export function validarExtension(extension) {
  if (
    extension === undefined &&
    !Array.isArray(extension) &&
    !(typeof '' === typeof extension)
  ) {
    return
  }

  let _extension

  if (Array.isArray(extension)) {
    if (extension.length < 4) return

    _extension = extension.map(cord => Number(cord))
  }

  if (typeof '' === typeof extension) {
    _extension = extension.split(',').map(cord => Number(cord))
  }

  return _extension
}

export function combinarObjetos(obj1, obj2) {
  return { ...obj1, ...obj2 }
}
