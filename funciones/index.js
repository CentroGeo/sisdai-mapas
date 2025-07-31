import html2canvas from 'html2canvas'

/**
 * Desencadena la acción de descargar una imagen en formato png cualquier elemento html como el canvas de un mapa.
 * @param {HTMLElement} html elemento que se codificará como imagen.
 * @param {HTMLElement} linkAncla elemento tipo '<a />' al que se vilculará la imagen como descarga.
 */
export function exportarHTMLComoPNG(html, linkAncla) {
  html2canvas(html, {
    useCORS: true,
  }).then((canvas) => {
    linkAncla.href = canvas.toDataURL();
    linkAncla.click();
  });
}
