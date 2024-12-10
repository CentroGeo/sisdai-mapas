import Estilo from '../../../utiles/vectores/Estilo'

const tipo = {
  categorias: 'categorias',
  graduacion: 'graduacion',
}

function categorias(_estilo) {
  const estilo = _estilo

  const cat = estilo[tipo.categorias]
  if (cat === undefined) return estilo

  delete estilo[tipo.categorias]
  console.log(cat)

  const s = Object.keys(cat.estilo).map(id => {
    return {
      filter: ['==', ['get', cat.atributo], id],
      // style: estilos[id],
      style: new Estilo(cat.estilo[id]).traducidoOl,
    }
  })

  console.log(s)

  return estilo
  // return s
}

export default function (_estilo) {
  const estilo = categorias(_estilo)

  const traducido = new Estilo(estilo).traducidoOl
  console.log(traducido)

  return traducido
}
