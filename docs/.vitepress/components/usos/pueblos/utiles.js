import axios from 'axios'
import { parametrosEnFormatoURL } from './../../../../../src/utiles'

export const cdnArchivos =
  'https://dev-dadsig-cdn.crip.conahcyt.mx/enis/cultura/pueblosindigenas'
export const urlApi =
  'https://dev-dadsig-cultura.crip.conahcyt.mx/pueblosindigenas-registro-api/'
export const url_gema_geoserver =
  'https://dev-dadsig-gema.crip.conahcyt.mx/geoserver'

// VER DE QUE MANERA PODEMOS TRAER LOS FEATURES DESDE LA CAPA
export function urlFeatures(capa, atributos, filtro) {
  const parametros = {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    outputFormat: 'application/json',
    typeName: capa,
    propertyName: atributos,
    cql_filter: filtro,
  }

  return `${url_gema_geoserver}/ows?${parametrosEnFormatoURL(parametros)}`
}
export const consultar = (f, e = () => {}) => axios(f).catch(e)
export const ordenarBbox = bbox => [bbox[1], bbox[0], bbox[3], bbox[2]]
export const extensionInicial = [-118.3651, 14.5321, -86.7104, 32.7187]

export const infoTerritorios = p =>
  `<p class="m-t-0">Territorio del pueblo: <b>${p.pueblo}</b></p><p class="m-b-0">${[
    // `Superficie: <b>${p.}</b>`,
    `Lengua: <b>${p.lengua}</b>`,
    `Fuente del dato: <b>${p.fuente}</b>`,
  ].join('<br />')}</p>`
export const infoPueblos = (p, pueblo) =>
  `<p class="m-t-0">Población indígena ${pueblo}</p><p class="m-b-0">${[
    `Pueblo: <b>${p.nombre_pueblo}</b>`,
    `Población: <b>${p.pihogares}</b>`,
    `Estado: <b>${p.nom_ent}</b>`,
    `Municipio: <b>${p.nom_mun}</b>`,
    `Localidad: <b>${p.nom_loc}</b>`,
  ].join('<br />')}</p>`
export const infoNucleo = p =>
  `<p class="m-t-0">Núcleo agrario: <b>${p.nom_nucleo}</b></p><p class="m-b-0">${[
    `Población indígena: <b>${p.pi_hogares}</b>`,
    `Tipo: <b>${p.tipo_propie}</b>`,
    `Programa: <b>${p.programa}</b>`,
  ].join('<br />')}</p>`
