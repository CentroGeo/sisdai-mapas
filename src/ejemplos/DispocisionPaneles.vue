<script setup>
import { ref } from 'vue'
import SisdaiContenedorVis from './../componentes/SisdaiContenedorVis.vue'

const clasesNoElementos = ['sin-cargador', 'sin-boton-conahcyt', 'sin-bordes']
const clasesPaneles = [
  'panel-encabezado-vis',
  'panel-izquierda-vis',
  'panel-derecha-vis',
  'panel-pie-vis',
]

const noElementos = ref([])
const paneles = ref([])

setTimeout(() => {
  // noElementos.value = noElementos.value.filter(el => el !== 'sin-cargador')
  noElementos.value.push('sin-cargador')
}, 5000)
</script>

<template>
  <div>
    <div>
      <span
        v-for="elemento in clasesNoElementos"
        :key="`input-${elemento}`"
      >
        <input
          type="checkbox"
          :id="elemento"
          :value="elemento"
          v-model="noElementos"
        />
        <label :for="elemento"> {{ elemento }}, </label>
      </span>
    </div>

    <div>
      <span
        v-for="clase in clasesPaneles"
        :key="`input-${clase}`"
      >
        <input
          type="checkbox"
          :id="clase"
          :value="clase"
          v-model="paneles"
        />
        <label :for="clase"> {{ clase }}, </label>
      </span>
    </div>

    <div>
      <h2>Dinamico</h2>
      <SisdaiContenedorVis
        :class="[...paneles.map(c => `con-${c}`), ...noElementos]"
      >
        <div
          class="p-1"
          v-for="clase in paneles"
          :key="`panel-${clase}`"
          :class="clase"
        >
          <h2>{{ clase }}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            similique tempora dicta delectus, assumenda officiis veritatis alias
            incidunt illo provident, laborum iure amet dolore error fugiat
            ducimus, est corrupti recusandae!
          </p>
        </div>
      </SisdaiContenedorVis>
    </div>

    <div>
      <h2>Modificado</h2>
      <SisdaiContenedorVis
        class="contenedor-modificado"
        :class="[...paneles.map(c => `con-${c}`), ...noElementos]"
      >
        <div
          class="p-1"
          v-for="clase in paneles"
          :key="`panel-${clase}-mod`"
          :class="clase"
        >
          <h2>{{ clase }}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            similique tempora dicta delectus, assumenda officiis veritatis alias
            incidunt illo provident, laborum iure amet dolore error fugiat
            ducimus, est corrupti recusandae!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Accusantium inventore architecto tempora eligendi, aliquid labore
            itaque voluptatem numquam. Fugit inventore unde molestias et
            distinctio voluptatum similique fuga quidem quasi ratione?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
            ratione fugit ex suscipit natus repudiandae commodi unde reiciendis
            deleniti aliquam! Sapiente non alias aperiam reprehenderit dolorem
            nulla qui doloremque vitae.
          </p>
        </div>
      </SisdaiContenedorVis>
    </div>
  </div>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

.contenedor-vis {
  .panel-encabezado-vis {
    background: skyblue;
  }
  .panel-izquierda-vis {
    background: sienna;
  }
  .contenido-vis {
    background: tomato;
    @include mediaquery('mov') {
      background: hotpink;
    }
  }
  .panel-derecha-vis {
    background: bisque;
  }
  .panel-pie-vis {
    background: darkcyan;
  }
}

.contenedor-modificado {
  @include mediaquery('esc') {
    &.con-panel-encabezado-vis.con-panel-derecha-vis {
      .panel-encabezado-vis {
        grid-area: 1 / 1 / span 1 / span 8;
        border-top-right-radius: 0;
      }
      .panel-derecha-vis {
        grid-area: 1 / 9 / span 2 / span 4;
        border-top-right-radius: 7px;
        // max-height: calc(300px + (100vh));
      }
      &.con-panel-izquierda-vis {
        .panel-encabezado-vis {
          grid-area: 1 / 1 / span 1 / span 9;
        }
        .panel-derecha-vis {
          grid-area: 1 / 10 / span 2 / span 3;
        }
      }
    }
  }
}
</style>
