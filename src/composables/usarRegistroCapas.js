import RegistroObjetos from '@/clases/ResgistroObjetos'

const registroCapas = new RegistroObjetos('capa')

export default function (idCapa) {
  function capa(_idCapa) {
    const capaParaConsultar = _idCapa || idCapa

    return registroCapas.objecto(capaParaConsultar)
  }

  function registrar(_idCapa) {
    registroCapas.registrar(_idCapa)
  }

  if (idValido(idCapa)) {
    registrar(idCapa)
  }

  function borrar(_idCapa) {
    const capaParaBorrar = _idCapa || idCapa

    registroCapas.borrar(capaParaBorrar)
  }

  return {
    capa,
    registrar,
    borrar,
  }
}

function idValido(id) {
  return id !== undefined && typeof id === typeof String()
}
