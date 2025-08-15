<script setup>
import { codeToHtml } from 'shiki'
import {
  computed,
  defineAsyncComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  useSlots,
  watch,
} from 'vue'

const props = defineProps({
  archivo: { type: String, default: undefined },
  codigo: { type: [String, Promise], default: undefined },
  lenguaje: { type: String, default: undefined },
})
const { archivo, codigo, lenguaje } = toRefs(props)

/**
 *
 */
const contenido = reactive({ texto: '', html: '', lenguaje: undefined })

const configuracion = computed(() => ({
  // lang: lenguajeComputado.value,
  lang: lenguaje.value || contenido.lenguaje,
  // theme: `github-${store.clasesAccesibles.includes('a11y-oscura') ? 'dark' : 'light'}`,
  theme: `github-${'light'}`,
}))
async function aplicarConfiguracion() {
  contenido.html = await codeToHtml(contenido.texto, configuracion.value)
}
watch(configuracion, aplicarConfiguracion)

/**
 * Convierte el prop `codigo` a texto plano
 */
async function convertirCodigoATexto() {
  if (codigo.value === undefined) return

  contenido.texto = codigo.value

  if (codigo.value instanceof Promise) {
    const respuesta = await codigo.value
    contenido.texto = respuesta.default
  }

  aplicarConfiguracion()
}
watch(codigo, convertirCodigoATexto)

const globoCopiar = ref('Copiar')
function copiarAPortapapeles() {
  navigator.clipboard.writeText(contenido.texto)
  globoCopiar.value = '¡Copiado!'

  setTimeout(() => {
    globoCopiar.value = 'Copiar'
  }, 2000)
}

const [archivoNombre, archivoExtension] =
  archivo.value !== undefined ? archivo.value.split('.') : []
const Componente = defineAsyncComponent(() =>
  archivo.value !== undefined
    ? import(`./../ejemplos/${archivoNombre}.${archivoExtension}`)
    : undefined
)

function ProcesarComponente() {
  contenido.lenguaje = archivoExtension
  import(`./../ejemplos/${archivoNombre}.${contenido.lenguaje}?raw`)
    .then(respuesta => {
      contenido.texto = respuesta.default
      aplicarConfiguracion()
    })
    .catch(error => {
      console.log(error)
    })
}

const slotDefault = useSlots()['default']
function ProcesarSlot() {
  contenido.texto = obtenerHTMLIndentado(slotDefault()[0].el.parentNode)
  // console.log(contenido.texto)

  aplicarConfiguracion()
}

// al cargar...
// console.log('V I S O R   C O D I G O')
if (archivo.value !== undefined) {
  ProcesarComponente()
} else if (slotDefault) {
  // si es por slot
  onMounted(ProcesarSlot)
} else {
  convertirCodigoATexto()
}
</script>

<template>
  <div
    class="contenedor-visor-codigo borde borde-color-secundario borde-redondeado-8 m-y-2 m-x-0"
  >
    <div
      class="demo m-2"
      v-if="archivo !== undefined"
    >
      <Componente />
    </div>

    <div class="visor-codigo">
      <span class="lenguaje nota">
        Código:
        {{
          lenguaje || contenido.lenguaje || 'Lenguaje de código no especificado'
        }}
      </span>
      <div
        class="codigo-html"
        :class="{ 'borde-t borde-color-secundario': archivo !== undefined }"
        v-html="contenido.html"
      />
      <button
        class="boton-pictograma boton-primario copiar"
        type="button"
        role="button"
        aria-label="Copiar código"
        @click="copiarAPortapapeles"
        v-globo-informacion:izquierda="globoCopiar"
      >
        <span
          class="pictograma-copiar"
          aria-hidden="true"
        />
      </button>
    </div>

    <div class="referencia-slot">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.contenedor-visor-codigo {
  // .demo {}

  .visor-codigo {
    position: relative;
    .codigo-html {
      * {
        font-family: 'IBM Plex Mono', monospace;
      }

      pre {
        min-height: 64px;
        padding: 20px 0;
        overflow-x: auto;
        overflow-y: auto;
        max-height: 400px;
        border-radius: 8px;
        margin: 0;
      }
      code {
        display: block;
        padding: 0 24px;
        font-size: 0.875em;
      }
    }
    .codigo-html.borde-t pre {
      border-radius: 0 0 8px 8px;
    }

    > button.copiar,
    span.lenguaje {
      position: absolute;
    }

    > button.copiar {
      top: 12px;
      right: 12px;
      z-index: 3;
      width: 40px;
      height: 40px;
      opacity: 1;
      transition:
        border-color 0.25s,
        background-color 0.25s,
        opacity 0.25s;

      > span {
        margin: auto;
      }
    }

    > span.lenguaje {
      z-index: 2;
      top: 2px;
      left: 16px;
      background: var(--fondo);
      transition:
        color 0.4s,
        opacity 0.4s;

      &.nota {
        margin: 0;
      }
    }

    &:hover {
      > button.copiar,
      > button.copiar:focus {
        opacity: 1;
      }
      > span.lenguaje {
        opacity: 1;
      }
    }
  }

  .referencia-slot {
    display: none;
  }
}
</style>

<script>
function substraerTag(node) {
  const elemento = node.outerHTML
  return elemento.substring(elemento.indexOf('<'), elemento.indexOf('>') + 1)
}

function obtenerHTMLIndentado(elemento, nivel = 0, espacioIdentacion = 2) {
  let nodos = Array.from(elemento.childNodes)
  if (nivel === 0 && nodos[0].nodeName === '#text') nodos = nodos.slice(1)

  return nodos
    .map(nodo => {
      const indentacion = ' '.repeat(nivel * espacioIdentacion)

      if (nodo instanceof HTMLElement) {
        let txt = `${indentacion}${substraerTag(nodo)}`

        if (nodo.childNodes.length >= 1) {
          txt += `\n${obtenerHTMLIndentado(nodo, nivel + 1)}\n`
          txt += `${indentacion}</${nodo.localName}>`
        }

        return txt
      }
      return `${indentacion}${nodo.wholeText.trim()}`
    })
    .join('\n')
}
</script>
