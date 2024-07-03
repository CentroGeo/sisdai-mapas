// This file is part of sisdai-mapas.
//
//   sisdai-mapas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-mapas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.

/**
 * @module controles/utiles
 */

/**
 * Crea un elemento html de tipo div, para usarse como contenedor del control, con las siguientes
 * características
 * @param {String} claseCss Clase que distinguirá al elemento contenedor
 * @returns {HTMLDivElement} Elemento html
 */
export function crearContenedorControl(claseCss) {
  const contenedorControl = document.createElement('div')

  contenedorControl.className = `sisdai-mapa-control sisdai-mapa-control-${claseCss} ol-unselectable`

  return contenedorControl
}

/**
 * Crea un elemento html de tipo botón con las siguientes características
 * @param {String} ariaLabel texto que se asignará al elemento para el asistente de voz.
 * @param {String} claseCss Clase que distinguirá al elemento, recomendable usar la misma clase
 * del contenedor
 * @param {String} icono Icono que se visualizará dentro del botón
 * @param {Function} accion Función que se desencadenará con el evento click
 * @returns {HTMLButtonElement} Elemento html
 */
export function crearBotonControl(ariaLabel, claseCss, icono, accion) {
  const boton = document.createElement('button')

  // boton.ariaLabel = ariaLabel
  boton.className = `sisdai-mapa-control-${claseCss}-boton boton-pictograma boton-primario`
  boton.type = 'button'
  boton.innerHTML = `<span class="pictograma-${icono}" aria-hidden="true"></span>`
  boton.setAttribute('role', 'button')
  boton.setAttribute('aria-label', ariaLabel)

  boton.addEventListener('click', accion, false)
  boton.addEventListener('click', accion, false)

  return boton
}
