import View from 'ol/View'
import { reactive } from 'vue'
import Mapa from './../clases/Mapa'
import RegistroObjetos from './../clases/ResgistroObjetos'
import controles from './../controles'

const registroMapas = new RegistroObjetos('mapa')

export default function (idMapa) {
  function registrarMapa(_idMapa, target, proyeccion) {
    registroMapas.registrar(_idMapa, reactive(crearMapa(target, proyeccion)))
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
 * Creación del objeto mapa.
 * @param {HTMLDivElement|String} target elemento o id del elemento html que contendrá el mapa.
 * @param {String} proyeccion
 * @returns {import("./../clases/Mapa.js").default} Mapa
 */
function crearMapa(target, proyeccion) {
  console.log('proyeccion:', proyeccion)

  return new Mapa({
    target,
    layers: [],
    controls: [
      new controles.AcercarAlejar(),
      new controles.AjusteVista(),
      new controles.EscalaGrafica(),
    ],
    view: new View({
      projection: proyeccion,
    }),
  })
}
