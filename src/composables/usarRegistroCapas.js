import { reactive } from 'vue'

let capasRegistradas = {}

export default function (idCapa) {
  function capaEsxiste(_idCapa) {
    return Object.keys(capasRegistradas).includes(_idCapa)
  }

  function registrar(_idCapa) {
    if (!capaEsxiste(_idCapa)) {
      capasRegistradas[_idCapa] = reactive({})
      console.log(`capa ${_idCapa} registrada`)
    }
  }

  function idCapValida(_idCapa) {
    return _idCapa !== undefined && typeof _idCapa === typeof String()
  }

  if (idCapValida(idCapa)) {
    registrar(idCapa)
  }

  function borrar(_idCapa) {
    const capaParaBorrar = _idCapa || idCapa
    if (capaEsxiste(capaParaBorrar)) {
      delete capasRegistradas[capaParaBorrar]
      console.log(`grafica ${capaParaBorrar} borrada`)
    }
  }

  function capa(_idCapa) {
    const capaParaConsultar = _idCapa || idCapa
    if (capaEsxiste(capaParaConsultar)) {
      return capasRegistradas[capaParaConsultar]
    }

    // eslint-disable-next-line
    console.warn(`No se encontró la capa ${capaParaConsultar}`)
  }

  return {
    registrar,
    borrar,
    capa,
  }
}
