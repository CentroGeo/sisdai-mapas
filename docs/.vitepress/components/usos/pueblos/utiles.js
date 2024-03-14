import axios from 'axios'
import { parametrosEnFormatoURL } from './../../../../../src/utiles'

const geoserver = 'https://dev-dadsig-gema.crip.conahcyt.mx/geoserver'
export const urls = {
  cdn: 'https://dev-dadsig-cdn.crip.conahcyt.mx/enis/cultura/pueblosindigenas',
  api: 'https://dev-dadsig-cultura.crip.conahcyt.mx/pueblosindigenas-registro-api/',
  wms: `${geoserver}/wms`,
}

// VER DE QUE MANERA PODEMOS TRAER LOS FEATURES DESDE LA CAPA
export function urlFeatures(params) {
  const parametros = {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    outputFormat: 'application/json',
    typeName: undefined,
    propertyName: undefined,
    cql_filter: undefined,
  }

  return `${geoserver}/ows?${parametrosEnFormatoURL({ ...parametros, ...params })}`
}
export const consultar = (url, f, e = () => {}) => axios(url).then(f).catch(e)
export const ordenarBbox = bbox => [bbox[1], bbox[0], bbox[3], bbox[2]]
export const extensionInicial = '-118.3651,14.5321,-86.7104,32.7187'

export const info = {
  casaComedor: p =>
    `<p class="m-t-0">${p.tipo} "${p.nombre}"</b></p><p class="m-b-0">${[
      `Personas beneficiadas: <b>${p.ben_total}</b>`,
      `Región indígena: <b>${p.region}</b>`,
      `Estado: <b>${p.nom_ent}</b>`,
      `Municipio: <b>${p.nom_mun}</b>`,
      `Localidad: <b>${p.nom_loc}</b>`,
    ].join('<br />')}</p>`,
  centroCoordinador: p =>
    `<p class="m-t-0">Centro Coordinador "${p.nombre}"</p><p class="m-b-0">${[
      `Contacto: <b>${p.correo}</b>`,
      `Estado: <b>${p.nom_ent}</b>`,
      `Municipio: <b>${p.nom_mun}</b>`,
      `Localidad: <b>${p.nom_loc}</b>`,
    ].join('<br />')}</p>`,
  comunidad: p =>
    `<p class="m-t-0">Comunidad indígena: <b>${p.nom_com}</b></p><p class="m-b-0">${[
      // `Nombre de la comunidad en la lengua indígena: <b>${p.pi_hogares}</b>`,
      `Pueblo: <b>${p.nom_pueblo1}</b>`,
      // `Autodenominación: <b>${p.programa}</b>`,
      `Estado: <b>${p.nom_ent}</b>`,
      `Municipio: <b>${p.nom_mun}</b>`,
      `Localidad: <b>${p.nom_loc}</b>`,
    ].join('<br />')}</p>`,
  escuela: p =>
    `<p class="m-t-0">Establecimiento escolar</p><p class="m-b-0">${[
      `Nombre: <b>${p.nom_centro}</b>`,
      `CCT: <b>${p.cv_centro}</b>`,
      `Estado: <b>${p.nom_edo}</b>`,
      `Municipio: <b>${p.nom_mun}</b>`,
      // `Localidad: <b>${p.nom_loc}</b>`,
    ].join('<br />')}</p>`,
  hospital: p =>
    `<p class="m-t-0">Hospital</p><p class="m-b-0">${[
      `Nombre: <b>${p.nom_unidad}</b>`,
      `Institución: <b>${p.nom_inst}</b>`,
      `Estado: <b>${p.nom_ent}</b>`,
      `Municipio: <b>${p.nom_mun}</b>`,
      `Localidad: <b>${p.nom_loc}</b>`,
    ].join('<br />')}</p>`,
  hospitalN1: p =>
    `<p class="m-t-0">Hospital</p><p class="m-b-0">${[
      `Nombre: <b>${p.nom_unidad}</b>`,
      `Institución: <b>${p.nom_inst}</b>`,
      `Estado: <b>${p.nom_entidad}</b>`,
      `Municipio: <b>${p.nom_municipio}</b>`,
      `Localidad: <b>${p.nom_localidad}</b>`,
    ].join('<br />')}</p>`,
  nucleo: p =>
    `<p class="m-t-0">Núcleo agrario: <b>${p.nom_nucleo}</b></p><p class="m-b-0">${[
      `Población indígena: <b>${p.pi_hogares}</b>`,
      `Tipo: <b>${p.tipo_propie}</b>`,
      `Programa: <b>${p.programa}</b>`,
    ].join('<br />')}</p>`,
  oficinaRepre: p =>
    `<p class="m-t-0">${p.nombre}</p><p class="m-b-0">${[
      `Contacto: <b>${p.correo}</b>`,
      `Estado: <b>${p.nom_ent}</b>`,
      `Municipio: <b>${p.nom_mun}</b>`,
      `Localidad: <b>${p.nom_loc}</b>`,
    ].join('<br />')}</p>`,
  pueblo: (p, pueblo) =>
    `<p class="m-t-0">Población indígena ${pueblo}</p><p class="m-b-0">${[
      `Pueblo: <b>${p.nombre_pueblo}</b>`,
      `Población: <b>${p.pihogares}</b>`,
      `Estado: <b>${p.nom_ent}</b>`,
      `Municipio: <b>${p.nom_mun}</b>`,
      `Localidad: <b>${p.nom_loc}</b>`,
    ].join('<br />')}</p>`,
  radiodifusora: p =>
    `<p class="m-t-0">${p.nombre}</p><p class="m-b-0">${[
      `Contacto: <b>${p.correo}</b>`,
      `Estado: <b>${p.nom_ent}</b>`,
      `Municipio: <b>${p.nom_mun}</b>`,
      `Localidad: <b>${p.nom_loc}</b>`,
    ].join('<br />')}</p>`,
  territorio: p =>
    `<p class="m-t-0">Territorio del pueblo: <b>${p.pueblo}</b></p><ul class="p-l-0" style="list-style: none;">${[
      // `<li class="m-t-0">Superficie: <b>${p.}</b></li>`,
      `<li class="m-t-0">Lengua: <b>${p.lengua}</b></li>`,
      `<li class="m-t-0">Fuente del dato: <b>${p.fuente}</b></li>`,
    ].join('')}</ul>`,
}
