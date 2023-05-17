# ¿Por qué prueba? ​

Las pruebas automatizadas lo ayudan a usted y a su equipo a crear aplicaciones Vue complejas de forma rápida y segura al evitar regresiones y alentarlo a dividir su aplicación en funciones, módulos, clases y componentes comprobables. Al igual que con cualquier aplicación, su nueva aplicación Vue puede fallar de muchas maneras, y es importante que pueda detectar estos problemas y solucionarlos antes de su lanzamiento.

En esta guía, cubriremos la terminología básica y brindaremos nuestras recomendaciones sobre qué herramientas elegir para su aplicación Vue 3.

Hay una sección específica de Vue que cubre componibles. Consulte [Testing Composables](#testing-composables) a continuación para obtener más detalles.

## Cuándo probar

​
¡Comienza a probar temprano! Le recomendamos que comience a escribir pruebas tan pronto como pueda. Cuanto más espere para agregar pruebas a su aplicación, más dependencias tendrá su aplicación y más difícil será comenzar.

## Tipos de prueba

​
Al diseñar la estrategia de prueba de su aplicación Vue, debe aprovechar los siguientes tipos de prueba:

- **Unit**: Verifica que las entradas a una función, clase o componible determinada produzcan la salida o los efectos secundarios esperados.
- **Component**: Verifica que su componente se monte, renderice, se pueda interactuar con él y se comporte como se esperaba. Estas pruebas importan más código que las pruebas unitarias, son más complejas y requieren más tiempo para ejecutarse.
- **End-to-end**: comprueba las funciones que abarcan varias páginas y realiza solicitudes de red reales en su aplicación Vue creada en producción. Estas pruebas a menudo implican poner en pie una base de datos u otro backend.

Cada tipo de prueba juega un papel en la estrategia de prueba de su aplicación y cada uno lo protegerá contra diferentes tipos de problemas.

## Descripción general

​
Discutiremos brevemente qué es cada uno de estos, cómo se pueden implementar para las aplicaciones Vue y brindaremos algunas recomendaciones generales.

## Unit Testing

Las pruebas unitarias se escriben para verificar que las unidades de código pequeñas y aisladas funcionan como se espera. Una prueba de unidad generalmente cubre una sola función, clase, componible o módulo. Las pruebas unitarias se centran en la corrección lógica y solo se ocupan de una pequeña parte de la funcionalidad general de la aplicación. Pueden burlarse de gran parte del entorno de su aplicación (por ejemplo, estado inicial, clases complejas, módulos de terceros y solicitudes de red).

En general, las pruebas unitarias detectarán problemas con la lógica comercial y la corrección lógica de una función.

Tomemos por ejemplo esta función `increment`:

```js
// helpers.js
export function increment(current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

Debido a que es muy autónomo, será fácil invocar la función `increment` y afirmar que devuelve lo que se supone que debe devolver, por lo que escribiremos una prueba unitaria.

Si alguna de estas afirmaciones falla, está claro que el problema está contenido dentro de la función `increment`.

```js
// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
  test('increments the current number by 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('does not increment the current number over the max', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('has a default max of 10', () => {
    expect(increment(10)).toBe(10)
  })
})
```

Como se mencionó anteriormente, las pruebas unitarias generalmente se aplican a la lógica comercial, los componentes, las clases, los módulos o las funciones independientes que no involucran la representación de la interfaz de usuario, las solicitudes de red u otras preocupaciones ambientales.

Por lo general, estos son módulos simples de JavaScript / TypeScript que no están relacionados con Vue. En general, la escritura de pruebas unitarias para la lógica empresarial en aplicaciones Vue no difiere significativamente de las aplicaciones que utilizan otros marcos.

Hay dos instancias en las que SÍ realiza pruebas unitarias de características específicas de Vue:

1. Composables
2. Componentes

### Composables

Una categoría de funciones específicas de las aplicaciones Vue son [Composables](https://vuejs.org/guide/reusability/composables.html), que pueden requerir un manejo especial durante las pruebas. Consulte [Testing Composables](#testing-composables) a continuación para obtener más detalles.

### Unit Testing Components

Un componente se puede probar de dos maneras:

1. Whitebox: Pruebas unitarias

   Las pruebas que son "pruebas Whitebox" conocen los detalles de implementación y las dependencias de un componente. Se centran en aislar el componente bajo prueba. Estas pruebas generalmente implicarán burlarse de algunos, si no todos, de los elementos secundarios de su componente, así como también configurar el estado y las dependencias del complemento (por ejemplo, Pinia).

2. Blackbox: prueba de componentes

   Las pruebas que son "pruebas Blackbox" desconocen los detalles de implementación de un componente. Estas pruebas se burlan lo menos posible para probar la integración de su componente y todo el sistema. Por lo general, representan todos los componentes secundarios y se consideran más como una "prueba de integración". Consulte las recomendaciones de [prueba de componentes](#component-testing) a continuación.

### Recomendación

​

- [Vitest](https://vitest.dev/)

  Dado que la configuración oficial creada por create-vue se basa en [Vite](https://vitejs.dev/), recomendamos usar un marco de pruebas unitarias que pueda aprovechar la misma configuración y transformar la canalización directamente desde Vite. [Vitest](https://vitest.dev/) es un marco de pruebas unitarias diseñado específicamente para este propósito, creado y mantenido por los miembros del equipo de Vue/Vite. Se integra con proyectos basados en Vite con un esfuerzo mínimo y es increíblemente rápido.

### Otras opciones

​

- [Peeky](https://peeky.dev/) es otro corredor rápido de pruebas unitarias con integración Vite de primera clase. También lo crea un miembro del equipo central de Vue y ofrece una interfaz de prueba basada en GUI.
- [Jest](https://jestjs.io/) es un marco de prueba de unidad popular y se puede hacer que funcione con Vite a través del paquete [vite-jest](https://github.com/sodatea/vite-jest). Sin embargo, solo recomendamos Jest si tiene un conjunto de pruebas de Jest existente que debe migrarse a un proyecto basado en Vite, ya que Vitest ofrece una integración más fluida y un mejor rendimiento.

## Component Testing

En las aplicaciones Vue, los componentes son los principales bloques de construcción de la interfaz de usuario. Por lo tanto, los componentes son la unidad natural de aislamiento cuando se trata de validar el comportamiento de su aplicación. **_Desde una perspectiva de granularidad, las pruebas de componentes se encuentran en algún lugar por encima de las pruebas unitarias y pueden considerarse una forma de prueba de integración_**. Gran parte de su aplicación Vue debe estar cubierta por una prueba de componente y recomendamos que cada componente Vue tenga su propio archivo de especificaciones (spec).

Las pruebas de componentes deben detectar problemas relacionados con los accesorios, los eventos, las ranuras que proporciona, los estilos, las clases, los ganchos del ciclo de vida y más de su componente.

Las pruebas de componentes no deben burlarse de los componentes secundarios, sino probar las interacciones entre su componente y sus elementos secundarios interactuando con los componentes como lo haría un usuario. Por ejemplo, una prueba de componente debe hacer clic en un elemento como lo haría un usuario en lugar de interactuar mediante programación con el componente.

Las pruebas de componentes deben centrarse en las interfaces públicas del componente en lugar de los detalles de implementación internos. Para la mayoría de los componentes, la interfaz pública se limita a: eventos emitidos, accesorios y espacios. Al realizar pruebas, recuerde probar lo que hace un componente, no cómo lo hace.

**Hacer**

- Para la lógica visual: afirme la salida de representación correcta en función de los accesorios y las ranuras ingresados.

- Para la lógica de comportamiento: afirme las actualizaciones de procesamiento correctas o los eventos emitidos en respuesta a los eventos de entrada del usuario.

  En el siguiente ejemplo, demostramos un componente Stepper que tiene un elemento DOM etiquetado como "incremento" y se puede hacer clic. Pasamos un accesorio llamado `max` que evita que Stepper se incremente más allá de `2`, por lo que si hacemos clic en el botón 3 veces, la interfaz de usuario aún debería decir `2`.

  No sabemos nada sobre la implementación de Stepper, solo que la "entrada" es el apoyo `max` y la "salida" es el estado del DOM como lo verá el usuario.

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

const wrapper = mount(Stepper, {
  props: {
    max: 1,
  },
})

expect(wrapper.find(valueSelector).text()).toContain('0')

await wrapper.find(buttonSelector).trigger('click')

expect(wrapper.find(valueSelector).text()).toContain('1')
```

- **No hacer**

  No afirme el estado privado de una instancia de componente ni pruebe los métodos privados de un componente. Probar los detalles de implementación hace que las pruebas sean frágiles, ya que es más probable que se rompan y requieran actualizaciones cuando cambia la implementación.

  El trabajo final del componente es generar la salida DOM correcta, por lo que las pruebas que se centran en la salida DOM brindan el mismo nivel de garantía de corrección (si no más) y son más sólidas y resistentes al cambio.

  No confíe exclusivamente en las pruebas instantáneas. Afirmar cadenas HTML no describe la corrección. Escribir pruebas con intencionalidad.

  Si un método debe probarse a fondo, considere extraerlo en una función de utilidad independiente y escriba una prueba de unidad dedicada para él. Si no se puede extraer limpiamente, se puede probar como parte de un componente, integración o prueba de extremo a extremo que lo cubra.

### Recomendación​

- [Vitest](https://vitest.dev/) para componentes o componibles que se renderizan sin cabeza (por ejemplo, la función [useFavicon](https://vueuse.org/core/useFavicon/#usefavicon) en VueUse). Los componentes y DOM se pueden probar usando [@vue/test-utils](https://github.com/vuejs/test-utils).

- [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/overview) para componentes cuyo comportamiento esperado depende de la representación adecuada de estilos o la activación de eventos DOM nativos. Se puede usar con Testing Library a través de [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro/).

Las principales diferencias entre Vitest y los corredores basados en navegador son la velocidad y el contexto de ejecución. En resumen, los ejecutores basados en navegador, como Cypress, pueden detectar problemas que los ejecutores basados en nodos, como Vitest, no pueden (por ejemplo, problemas de estilo, eventos DOM nativos reales, cookies, almacenamiento local y fallas de red), pero los ejecutores basados en navegador son órdenes de magnitud más lentos que Vitest porque abren un navegador, compilan sus hojas de estilo y más. Cypress es un corredor basado en navegador que admite pruebas de componentes. Lea la [página de comparación de Vitest](https://vitest.dev/guide/comparisons.html#cypress) para obtener la información más reciente que compara Vitest y Cypress.

### Bibliotecas de montaje

​
La prueba de componentes a menudo implica montar el componente que se está probando de forma aislada, desencadenar eventos de entrada de usuario simulados y afirmar en la salida DOM renderizada. Hay bibliotecas de utilidades dedicadas que simplifican estas tareas.

- [@vue/test-utils](https://github.com/vuejs/test-utils) es la biblioteca oficial de prueba de componentes de bajo nivel que se escribió para proporcionar a los usuarios acceso a las API específicas de Vue. También es la biblioteca de nivel inferior sobre la que está construida `@testing-library/vue`.

- [@testing-library/vue](https://github.com/testing-library/vue-testing-library) es una biblioteca de pruebas de Vue centrada en probar componentes sin depender de los detalles de implementación. Su principio rector es que cuanto más se parezcan las pruebas a la forma en que se usa el software, más confianza pueden brindar.

Recomendamos usar `@vue/test-utils` para probar componentes en aplicaciones. `@testing-library/vue` tiene problemas con la prueba del componente asincrónico con Suspense, por lo que debe usarse con precaución.

### Otras opciones

​

- [Nightwatch](https://nightwatchjs.org/) es un corredor de pruebas E2E con compatibilidad con Vue Component Testing. ([Proyecto de ejemplo](https://github.com/nightwatchjs-community/todo-vue) en Nightwatch v2)

## E2E Testing

## Recetas

### Agregar Vitest a un proyecto

​
En un proyecto Vue basado en Vite, ejecute:

```sh
> npm install -D vitest happy-dom @testing-library/vue
```

A continuación, actualice la configuración de Vite para agregar el bloque de opciones de prueba:

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
  },
})
```

Luego, cree un archivo que termine en `*.test.js` en su proyecto. Puede colocar todos los archivos de prueba en un directorio de prueba en la raíz del proyecto o en directorios de prueba junto a sus archivos de origen. Vitest los buscará automáticamente usando la convención de nomenclatura.

```js
// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    },
  })

  // assert output
  getByText('...')
})
```

Finalmente, actualice `package.json` para agregar el script de prueba y ejecútelo:

```json{4}
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
> npm test
```

## Testing Composables
