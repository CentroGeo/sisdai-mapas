import Mapa from '@/clases/Mapa'
import RegistroObjetos from '@/clases/ResgistroObjetos'
import View from 'ol/View'
import { reactive } from 'vue'

const registroMapas = new RegistroObjetos('mapa')

export default function (idMapa) {
  function registrarMapa(_idMapa, target) {
    registroMapas.registrar(_idMapa, reactive(crearMapa(target)))
  }

  if (idValido(idMapa)) {
    registrarMapa(idMapa)
  }

  function mapa(_idMapa) {
    return registroMapas.objeto(_idMapa || idMapa)
  }

  function mapaPromesa(_idMapa) {
    return registroMapas.objetoPromesa(_idMapa || idMapa)
  }

  function borrarMapa(_idMapa) {
    registroMapas.borrar(_idMapa || idMapa)
  }

  return {
    registrarMapa,
    mapa,
    mapaPromesa,
    borrarMapa,
  }
}

function idValido(id) {
  return id !== undefined && typeof id === typeof String()
}

/**
 *
 * @param {*} target
 * @returns
 */
function crearMapa(target) {
  return new Mapa({
    target,
    layers: [],
    view: new View({
      projection: 'EPSG:4326',
    }),
  })
}
