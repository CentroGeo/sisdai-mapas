<script setup>
import { reactive, ref, watch } from 'vue'

// onMounted(() => {
//   if (window.location.search === '') {
//     window.location.search = '?capas=buscar'
//   }
//   if (window.location.hash === '') {
//     window.location.hash = '#map=10/19.6060/-98.7635'
//   }
//   procesarParametrosHash(window.location)
// })

const mapa = ref()

const vistaMapa = reactive({
  extension: '-118.3651,14.5321,-86.7104,32.7187',
  extensionMargen: 30,
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

function alMoverVista(vista) {
  let zoom = vista.getZoom()
  let centro = vista.getCenter()

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

const verPanelDerecho = ref(false)
watch(verPanelDerecho, nv => {
  if (nv) {
    vistaMapa.extensionMargen = [20, 320, 20, 20]
    // console.log('vistaMapa.extensionMargen', toRaw(vistaMapa.extensionMargen))
  } else {
    vistaMapa.extensionMargen = 30
    // console.log('vistaMapa.extensionMargen', vistaMapa.extensionMargen)
  }
})
</script>

<template>
  <div class="contenedor-gema">
    <div class="contenedor-gema-izquierdo">
      <button
        class="boton-chico"
        @click="mapa.exportarImagen('mapa-gema')"
      >
        Exportar imagen
      </button>

      <p
        v-for="(capa, idx) in [
          'hcti_centros_invest_conahcyt_0421_xy_p',
          'hcti_lab_nacionales_conahcyt_190523_xy_p',
          'gref_corredores_red_nac_caminos_21_nal_l',
          'hcti_snii_sexo_22_est_a',
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

      <button @click="verPanelDerecho = !verPanelDerecho">
        {{ verPanelDerecho ? 'esconder' : 'mostrar' }} panel derecho
      </button>
    </div>

    <SisdaiMapa
      class="gema con-panel-derecha-vis"
      :class="{ 'mostrar-panel-derecho': verPanelDerecho }"
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

      <!-- 
        url="https://dev-dadsig-gema.crip.conahcyt.mx/geoserver/wms"
      -->
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
        <div></div>
      </template>

      <template #panel-derecha-vis>
        <div class="panel-seleccion-capas">
          <SisdaiLeyenda
            v-for="capa in capasMapa"
            :key="`leyenda-${capa}`"
            :para="capa"
          />
        </div>
      </template>
    </SisdaiMapa>
  </div>
</template>

<style lang="scss">
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

div.contenedor-gema {
  height: 85vh;
  display: grid;
  grid-template-columns: 300px 1fr;

  .panel-seleccion-capas {
    width: 300px;
  }

  .sisdai-mapa.mostrar-panel-derecho {
    .sisdai-mapa-control-acercar-alejar,
    .sisdai-mapa-control-ajuste-vista {
      // right: calc(100vw / 4);
      right: calc(var(--margen) + 300px);
    }
  }

  label,
  h2 {
    word-break: break-all;
  }
}
</style>
