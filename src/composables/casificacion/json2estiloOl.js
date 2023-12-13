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


import OlEstilo from 'ol/style/Style'
import OlEstiloRelleno from 'ol/style/Fill'
import OlEstiloContorno from 'ol/style/Stroke'

const equivalencias = {
  relleno: {
    clase: OlEstiloRelleno,
    llave: 'fill',
  },
  contorno: {
    clase: OlEstiloContorno,
    llave: 'stroke',
  },
  radio: {
    llave: 'radius',
  },
  grosor: {
    llave: 'width',
  },
  color: {
    llave: 'color',
  },
}

function jsonEstiloOl(obj) {
  const objEstilo = {}

  Object.keys(obj).forEach(key => {
    if (
      obj[key] === 'no' ||
      obj[key] === undefined ||
      equivalencias[key] === undefined
    ) {
      return
    }

    objEstilo[equivalencias[key].llave] = equivalencias[key].clase
      ? new equivalencias[key].clase(jsonEstiloOl(obj[key]))
      : obj[key]
  })

  return objEstilo
}

export function crearEstiloOl(obj) {
  return new OlEstilo(jsonEstiloOl(obj))
}
