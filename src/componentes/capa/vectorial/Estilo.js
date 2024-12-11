import Estilo from '../../../utiles/vectores/Estilo'

const tipo = {
  categorias: 'categorias',
  graduacion: 'graduacion',
}

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

    clases.push({
      else: true,
      style: general,
    })

    return clases
  }

  const gra = estilo[tipo.graduacion]
  if (gra !== undefined) {
    console.log('tiene', tipo.graduacion)
  }

  // console.log('solo estilo') // revisar, se duplica la ejecución (posiblemente por la carga)?*****
  return new Estilo(estilo).traducidoOl
}
