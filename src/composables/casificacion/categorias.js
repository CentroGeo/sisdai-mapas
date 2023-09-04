import { crearEstiloOl } from './json2estiloOl'

export function catergorias(olCapa, estilo, clasificacion) {
  const features = olCapa.getSource().getFeatures()

  const propiedades = features.map(feature => feature.getProperties())

  const unicos = [
    ...new Set(
      propiedades.map(propiedad => propiedad[clasificacion.value.columna])
    ),
  ]

  features.forEach(feature => {
    let _estilo = estilo.value
    _estilo[clasificacion.value.propiedadEstilo] = {
      color:
        clasificacion.value.colores[
          unicos.indexOf(feature.getProperties()[clasificacion.value.columna])
        ],
    }

    feature.setStyle(crearEstiloOl(_estilo))
  })
}

export function personalidada() {}

export default function () {}
