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

export const infoComunidad = p =>
  `<p class="m-t-0">Comunidad indígena: <b>${p.nom_com}</b></p><p class="m-b-0">${[
    // `Nombre de la comunidad en la lengua indígena: <b>${p.pi_hogares}</b>`,
    `Pueblo: <b>${p.nom_pueblo1}</b>`,
    // `Autodenominación: <b>${p.programa}</b>`,
    `Estado: <b>${p.nom_ent}</b>`,
    `Municipio: <b>${p.nom_mun}</b>`,
    `Localidad: <b>${p.nom_loc}</b>`,
  ].join('<br />')}</p>`
export const infoPueblos = (p, pueblo) =>
  `<p class="m-t-0">Población indígena ${pueblo}</p><p class="m-b-0">${[
    `Pueblo: <b>${p.nombre_pueblo}</b>`,
    `Población: <b>${p.pihogares}</b>`,
    `Estado: <b>${p.nom_ent}</b>`,
    `Municipio: <b>${p.nom_mun}</b>`,
    `Localidad: <b>${p.nom_loc}</b>`,
  ].join('<br />')}</p>`
export const infoTerritorios = p =>
  `<p class="m-t-0">Territorio del pueblo: <b>${p.pueblo}</b></p><ul class="p-l-0" style="list-style: none;">${[
    // `<li class="m-t-0">Superficie: <b>${p.}</b></li>`,
    `<li class="m-t-0">Lengua: <b>${p.lengua}</b></li>`,
    `<li class="m-t-0">Fuente del dato: <b>${p.fuente}</b></li>`,
  ].join('')}</ul>`
export const infoCentro = f =>
  `<p class="m-t-0">Centro Coordinador "${f.nom_institucion}"</p><p class="m-b-0">${[
    `Contacto: <b>${f.correo}</b>`,
    `Estado: <b>${f.nom_edo}</b>`,
    `Municipio: <b>${f.nom_mun}</b>`,
    `Localidad: <b>${f.nom_loc}</b>`,
  ].join('<br />')}</p>`
export const infoOficina = f =>
  `<p class="m-t-0">${f.nom_institucion}</p><p class="m-b-0">${[
    `Contacto: <b>${f.correo}</b>`,
    `Estado: <b>${f.nom_edo}</b>`,
    `Municipio: <b>${f.nom_mun}</b>`,
    `Localidad: <b>${f.nom_loc}</b>`,
  ].join('<br />')}</p>`
export const infoRadiodifusora = f =>
  `<p class="m-t-0">${f.nom_institucion}</p><p class="m-b-0">${[
    `Contacto: <b>${f.correo}</b>`,
    `Estado: <b>${f.nom_edo}</b>`,
    `Municipio: <b>${f.nom_mun}</b>`,
    `Localidad: <b>${f.nom_loc}</b>`,
  ].join('<br />')}</p>`
export const infoComedor = f =>
  `<p class="m-t-0">${toUpperCaseFirst(f.tipo.toLowerCase())} "${f.raz_n}"</b></p><p class="m-b-0">${[
    `Personas beneficiadas: <b>${valorComoMilesONulo(f.ben_total)}</b>`,
    `Región indígena: <b>${f.regin}</b>`,
    `Estado: <b>${f.nom_edo}</b>`,
    `Municipio: <b>${f.nom_mun}</b>`,
    `Localidad: <b>${f.nom_loc}</b>`,
  ].join('<br />')}</p>`
export const infoHospital = f =>
  `<p class="m-t-0">Hospital</p><p class="m-b-0">${[
    `Nombre: <b>${f['nombre de la unidad']}</b>`,
    `Institución: <b>${f['nombre de la institucion']}</b>`,
    `Estado: <b>${f['nombre de la entidad']}</b>`,
    `Municipio: <b>${f['nombre del municipio']}</b>`,
    `Localidad: <b>${f['nombre de la localidad']}</b>`,
  ].join('<br />')}</p>`
export const infoEscuela = f =>
  `<p class="m-t-0">Establecimiento escolar</p><p class="m-b-0">${[
    `Nombre: <b>${f.nom_cen_t}</b>`,
    `CCT: <b>${f.cv_centro}</b>`,
    `Estado: <b>${f.nom_edo}</b>`,
    `Municipio: <b>${f.nom_mun}</b>`,
    `Localidad: <b>${f.nom_loc}</b>`,
  ].join('<br />')}</p>`
export const infoNucleo = p =>
  `<p class="m-t-0">Núcleo agrario: <b>${p.nom_nucleo}</b></p><p class="m-b-0">${[
    `Población indígena: <b>${p.pi_hogares}</b>`,
    `Tipo: <b>${p.tipo_propie}</b>`,
    `Programa: <b>${p.programa}</b>`,
  ].join('<br />')}</p>`
