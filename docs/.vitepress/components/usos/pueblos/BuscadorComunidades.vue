<script setup>
import { ref, watch } from 'vue'
import { consultar, urls } from './utiles'

const emits = defineEmits(['alSeleccionarComunidad'])

const comunidades = ref([])
const comunidadesFiltradas = ref([])

function consultarDatosComunidades() {
  consultar(`${urls.cdn}/mapas/diccionaraioComunidades-17122021.json`, ({ status, data }) => {
    if (status !== 200) return

    comunidades.value = data
      .map(({ auto_com, nom_com, cve_pueblo1, nom_pueblo1 }) => {
        return { auto_com, nom_com, cve_pueblo1, nom_pueblo1 }
      })
      .filter(
        //este filtro evita que se desplegen comunidades repetidas en el listado
        (a, i, self) => self.findIndex((b) => a.nom_com === b.nom_com) === i
      )
      .sort((a, b) => {
        return a.nom_com < b.nom_com ? -1 : a.nom_com > b.nom_com ? 1 : 0
      })

    comunidadesFiltradas.value = comunidades.value

    // console.log(comunidades.value)
  })
}
consultarDatosComunidades()

const abierto = ref(false)

const busqueda = ref('')
watch(busqueda, (nv) => {
  if (nv.trim().length >= 1) {
    comunidadesFiltradas.value = comunidades.value.filter(({ nom_com }) =>
      nom_com.toLowerCase().includes(nv.trim().toLowerCase())
    )
  } else {
    comunidadesFiltradas.value = comunidades.value
  }
})

function seleccionar(params) {
  busqueda.value = params.nom_com
  abierto.value = false
  emits('alSeleccionarComunidad', params.cve_pueblo1)
  // console.log(params)
}

function limpiarBusqueda() {
  busqueda.value = ''
  emits('alSeleccionarComunidad', '')
}

defineExpose({ busqueda })
</script>

<template>
  <div class="buscador-comunidades contenedor ancho-fijo grid">
    <div class="columna-7-esc">
      <input
        type="text"
        placeholder=" Explora por comunidad"
        @click="abierto = !abierto"
        v-model="busqueda"
      />
      <span class="icono-buscar icono-3" />
      <!-- <button
        class="boton-icono boton-sin-borde boton-chico"
        v-if="busqueda.trim().length >= 1"
        @click="limpiarBusqueda"
      >
        <span class="icono-cerrar icono-3" />
        <span class="a11y-solo-lectura">Limpiar búsqueda.</span>
      </button> -->
      <ul class="borde-color-3 borde-redondeado-4" :class="{ 'abierto borde': abierto }">
        <li @click="limpiarBusqueda" v-if="busqueda.trim().length >= 1">
          <i>Todas las comunidades</i>
        </li>
        <li
          class="borde-redondeado-4 m-0"
          v-for="(comunidad, idx) in comunidadesFiltradas"
          :key="idx"
          @click="seleccionar(comunidad)"
        >
          {{ comunidad.nom_com }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'sisdai-css/src/_variables';
// @import 'sisdai-css/src/_mixins';

.contenedor-vis-paneles {
  .contenedor-selectores select {
    z-index: 2;
  }
  .contenedor-selectores,
  .buscador-comunidades {
    column-gap: 16px;
  }

  @include mediaquery('esc') {
    position: relative;
  }
}

.buscador-comunidades {
  z-index: 1;
  .columna-7-esc {
    display: grid;
    position: relative;

    input[type='text'] {
      // margin: 0 !important;
      padding-left: 48px !important;

      &:before {
        content: 'a';
      }
      &:after {
        content: 'z';
      }
    }

    span.icono-buscar {
      position: absolute;
      margin-top: 8px;
      padding: 8px 16px;
      color: var(--input-deshabilitado-color);
    }

    button.boton-icono {
      position: absolute;
      margin-top: 10px;
      margin-right: 2px;
      right: 0;
    }

    ul {
      background: white;
      margin-top: 39px;
      position: absolute;
      width: 100%;
      z-index: 99;
      max-height: 0px;
      overflow-y: auto;
      scrollbar-width: thin;

      li {
        list-style: none;
        padding: 8px;
        cursor: pointer;
        &:hover {
          background: #f0f6ff 0% 0% no-repeat padding-box;
        }
      }

      &.abierto {
        max-height: 300px;
        padding: 16px;
      }
    }
  }
  @include mediaquery('mov') {
    .columna-7-esc input[type='text'] {
      margin: 0 !important;
    }
  }

  @include mediaquery('esc') {
    position: absolute;
    padding-right: 48px !important;

    .columna-7-esc ul {
      margin-top: 46px;
    }
  }
}
</style>
