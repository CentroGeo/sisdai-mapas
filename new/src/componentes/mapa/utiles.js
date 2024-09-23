/**
 * Devuelve las clases para el uso de los páneles cuando detecta que se están utilizando.
 * @returns
 */
export function panelesEnUso(slots) {
  return ['encabezado', 'izquierda', 'derecha', 'pie']
    .filter((panel) => !!slots[`panel-${panel}-vis`])
    .map((panel) => `con-panel-${panel}-vis`)
}
