<script setup>
import { reactive, ref } from 'vue'

if (window.location.search === '') {
  window.location.search = '?capas=buscar'
}
if (window.location.hash === '') {
  window.location.hash = '#map=10/19.6060/-98.7635'
}

const mapa = ref()

const vistaMapa = reactive({
  extension: '-118.3651,14.5321,-86.7104,32.7187',
  margenExtension: 30,
  centro: [undefined, undefined],
  zoom: undefined,
})

function procesarParametrosHash({ hash }) {
  const obtenerParametroHash = n =>
    hash !== '' ? parseFloat(hash.split('=')[1].split('/')[n]) : undefined

  vistaMapa.zoom = obtenerParametroHash(0)
  vistaMapa.centro = `${obtenerParametroHash(2)},${obtenerParametroHash(1)}`
  vistaMapa.extension = undefined
  // console.log('vista', JSON.stringify(vistaMapa))
}
procesarParametrosHash(window.location)

function alMoverVista({ map }) {
  let zoom = map.getView().getZoom()
  let centro = map.getView().getCenter()

  let hash = `#map=${zoom.toFixed(0)}/${centro[1].toFixed(
    4
  )}/${centro[0].toFixed(4)}`

  if (hash !== window.location.hash) {
    // window.location.hash = hash
  }
}

function print(mgs) {
  console.log(mgs)
}

const capasMapa = ref([])
</script>

<template>
  <SisdaiMapa
    class="mapa-gema sin-cargador sin-bordes sin-boton-conahcyt con-panel-izquierda-vis con-panel-derecha-vis"
    ref="mapa"
    :vista="vistaMapa"
    @alMoverVista="alMoverVista"
  >
    <SisdaiCapaXyz
      @alIniciarCarga="() => print(`GEMA: xyz cargando...`)"
      @alFinalizarCarga="
        estado => print(`GEMA: xyz ${estado ? 'cargada' : 'error'}`)
      "
    />

    <SisdaiCapaWms
      v-for="capa in capasMapa"
      :key="`capa-${capa}`"
      :id="capa"
      :nombre="capa"
      :parametros="{
        LAYERS: capa,
      }"
      @alIniciarCarga="() => print(`${capa} cargando...`)"
      @alFinalizarCarga="
        estado => print(`${capa} ${estado ? 'cargada' : 'error'}`)
      "
    />

    <template #panel-izquierda-vis>
      <div class="p-1">
        <button
          class="boton-chico"
          @click="mapa.exportarImagen('mapa-gema')"
        >
          Exportar imagen
        </button>

        <p
          v-for="(capa, idx) in [
            'contexto:gref_division_estatal_2020',
            'contexto:gref_division_municipal_2020',
            'contexto:gref_inst_educacion_sup_05_06_07_2021',
            'contexto:gref_uneme_capa_ssa_2702202',
          ]"
          :key="`check-${idx}`"
        >
          <input
            type="checkbox"
            :id="`check-${idx}`"
            :value="capa"
            v-model="capasMapa"
          />
          <label :for="`check-${idx}`">{{ capa }}</label>
        </p>
      </div>
    </template>

    <template #panel-derecha-vis>
      <div class="p-1">
        <SisdaiLeyenda
          v-for="capa in capasMapa"
          :key="`leyenda-${capa}`"
          :para="capa"
        />
      </div>
    </template>
  </SisdaiMapa>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

div.mapa-gema {
  height: 100vh;
  @include mediaquery('esc') {
    grid-template-rows: minmax(300px, 100%);
  }

  label,
  h2 {
    word-break: break-all;
  }
}
</style>
