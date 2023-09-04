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
