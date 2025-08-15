import Estilo from '../../../utiles/vectores/Estilo'

const tipo = { categorias: 'categorias', graduacion: 'graduacion' }

/**
 * @see https://openlayers.org/en/latest/apidoc/module-ol_expr_expression.html#~EncodedExpression
 * @see https://openlayers.org/en/latest/apidoc/module-ol_style_flat.html#~FlatStyle
 * @see https://openlayers.org/en/latest/examples/style-expressions.html
 * @see https://openlayers.org/en/latest/examples/regularshape.html
 *
 * @param {*} _estilo
 * @returns
 */
export default function (_estilo) {
  const estilo = { ..._estilo }

  const cat = estilo[tipo.categorias]
  if (cat !== undefined) {
    delete estilo[tipo.categorias]

    const general = new Estilo(estilo).traducidoOl
    const clases = Object.keys(cat.estilo).map(id => ({
      filter: ['==', ['get', cat.atributo], id],
      style: { ...general, ...new Estilo(cat.estilo[id]).traducidoOl },
    }))

    clases.push({ else: true, style: general })

    return clases
  }

  const gra = estilo[tipo.graduacion]
  if (gra !== undefined) {
    console.log('tiene', tipo.graduacion)
  }

  // console.log('solo estilo') // revisar, se duplica la ejecución (posiblemente por la carga)?*****
  return new Estilo(estilo).traducidoOl
}
