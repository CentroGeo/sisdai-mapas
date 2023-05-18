import RegistroObjetos from '@/clases/ResgistroObjetos'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

const registroMapas = new RegistroObjetos('mapa')

export default function (idMapa) {
  function mapa(_idMapa) {
    const mapaParaConsultar = _idMapa || idMapa

    return registroMapas.objeto(mapaParaConsultar)
  }

  function registrarMapa(_idMapa, target) {
    registroMapas.registrar(_idMapa, crearMapa(target))
  }

  if (idValido(idMapa)) {
    registrarMapa(idMapa)
  }

  function borrarMapa(_idMapa) {
    const mapaParaBorrar = _idMapa || idMapa

    registroMapas.borrar(mapaParaBorrar)
  }

  return {
    registrarMapa,
    borrarMapa,
    mapa,
  }
}

function idValido(id) {
  return id !== undefined && typeof id === typeof String()
}

function crearMapa(target) {
  return new Map({
    target,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [-102, 24],
      zoom: 4.5,
      projection: 'EPSG:4326',
    }),
  })
}
