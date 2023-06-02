<script setup>
import { ref } from 'vue'
import SisdaiContenedorVis from './../componentes/SisdaiContenedorVis.vue'

const paneles = ref([])
</script>

<template>
  <div>
    <div>
      <input
        type="checkbox"
        id="solo-vis"
        value="solo-vis"
        v-model="paneles"
      />
      <label for="solo-vis"> solo vis, </label>

      <span
        v-for="clase in [
          'panel-encabezado-vis',
          'panel-izquierda-vis',
          'panel-derecha-vis',
          'panel-pie-vis',
        ]"
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
        :class="paneles.map(c => (c !== 'solo-vis' ? `con-${c}` : c))"
      >
        <div
          class="p-1"
          v-for="clase in paneles.filter(c => c !== 'solo-vis')"
          :key="`input-${clase}`"
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
        :class="paneles.map(c => (c !== 'solo-vis' ? `con-${c}` : c))"
      >
        <div
          class="p-1"
          v-for="clase in paneles.filter(c => c !== 'solo-vis')"
          :key="`input-${clase}`"
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
  </div>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

.sisdai-contenedor-vis {
  .panel-encabezado-vis {
    background: skyblue;
  }
  .panel-izquierda-vis {
    background: sienna;
  }
  .contenido-vis {
    background: #e9e9e9;
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
  .panel-izquierda-vis,
  .panel-derecha-vis {
    grid-row: 2 / 4;
  }

  &.con-panel-izquierda-vis {
    .panel-pie-vis {
      grid-column: 2 / 4;
    }
  }

  &.con-panel-derecha-vis {
    .panel-encabezado-vis {
      border-top-right-radius: 0px;
    }
    .panel-encabezado-vis,
    .panel-pie-vis {
      grid-column: 1 / 3;
    }
    .panel-derecha-vis {
      grid-row: 1 / 4;
      border-top-right-radius: 7px;
    }
  }

  &.con-panel-izquierda-vis.con-panel-derecha-vis {
    .panel-encabezado-vis {
      grid-column: 1 / 4;
    }
    .panel-pie-vis {
      grid-column: 2 / 4;
    }
  }
}
</style>
