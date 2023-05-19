import RegistroObjetos from '@/clases/ResgistroObjetos'
import { Map, View } from 'ol'
// import TileLayer from 'ol/layer/Tile'
// import OSM from 'ol/source/OSM'

const registroMapas = new RegistroObjetos('mapa')

export default function (idMapa) {
  function registrarMapa(_idMapa, target) {
    registroMapas.registrar(_idMapa, crearMapa(target))
  }

  if (idValido(idMapa)) {
    registrarMapa(idMapa)
  }

  function mapa(_idMapa) {
    return registroMapas.objeto(_idMapa || idMapa)
  }

  function mapaPromesa(_idMapa) {
    return registroMapas.objetoAsync(_idMapa || idMapa)
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

function crearMapa(target) {
  return new Map({
    target,
    layers: [
      // new TileLayer({
      //   source: new OSM(),
      // }),
    ],
    view: new View({
      center: [-102, 24],
      zoom: 4.5,
      projection: 'EPSG:4326',
    }),
  })
}
