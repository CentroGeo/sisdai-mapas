/**
 * @see https://github.com/CartoDB/basemap-styles
 */
export function carto(estilo) {
  const catalogo = {
    claro: 'light_all',
    claro_sin_etiqutas: 'light_nolabels',
    claro_solo_etiqutas: 'light_only_labels',
    oscuro: 'dark_all',
    oscuro_sin_etiqutas: 'dark_nolabels',
    oscuro_solo_etiqutas: 'dark_only_labels',
    viajero: 'rastertiles/voyager',
    viajero_sin_etiqutas: 'rastertiles/voyager_nolabels',
    viajero_solo_etiqutas: 'rastertiles/voyager_only_labels',
    viajero_etiqutas_debajo: 'rastertiles/voyager_labels_under',
  }

  return {
    // https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}{scale}.png
    url: `https://{a-c}.basemaps.cartocdn.com/${catalogo[estilo]}/{z}/{x}/{y}{scale}.png`,
    zmax: '20',
    zmin: '0',
    attribution: [
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    ],
  }
}

export function osm(estilo) {
  const catalogo = {
    standard: {
      url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png',
      zmax: '19',
      zmin: '0',
      referer: 'OpenStreetMap',
    },
    'H.O.T.': {
      url: 'http://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      zmax: '19',
      zmin: '0',
      referer: 'OpenStreetMap',
    },
  }

  return catalogo[estilo]
}
