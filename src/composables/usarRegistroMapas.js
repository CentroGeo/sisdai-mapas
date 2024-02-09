import View from 'ol/View'
// import PointerEventType from 'ol/pointer/EventType'
import { reactive } from 'vue'
import { vista as vistaDefautl } from '../valores/mapa'
import Mapa from './../clases/Mapa'
import RegistroObjetos from './../clases/ResgistroObjetos'
import * as controles from './../controles'

const registroMapas = new RegistroObjetos('mapa')

/**
 *
 * @param {*} idMapa
 * @param {*} target
 * @param {*} proyeccion
 * @returns
 */
export default function (idMapa, target, proyeccion, emits) {
  function registrarMapa(_idMapa, _target, _proyeccion, _emits) {
    registroMapas.registrar(
      _idMapa,
      reactive(crearMapa(_target, _proyeccion, _emits))
    )
  }

  if (idValido(idMapa)) {
    registrarMapa(idMapa, target, proyeccion, emits)
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
function crearMapa(target, proyeccion, emits) {
  return new Mapa(
    {
      target,
      layers: [],
      controls: [
        new controles.EscalaGrafica(),
        new controles.AcercarAlejar(),
        new controles.AjustarVista(),
        new controles.EtiquetaAtribucion(),
        new controles.NavegacionTeclado(),
      ],
      view: new View({
        center: vistaDefautl.centro,
        projection: proyeccion,
        zoom: vistaDefautl.Acercamiento,
      }),
    },
    emits
  )
}
