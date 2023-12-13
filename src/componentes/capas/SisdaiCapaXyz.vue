<!--This file is part of sisdai-mapas.-->

<!--sisdai-mapas is free software: you can redistribute it and/or modify-->
<!--it under the terms of the GNU Lesser General Public License as published by the-->
<!--Free Software Foundation, either version 3 of the License, or-->
<!--(at your option) any later version.-->

<!--sisdai-mapas is distributed in the hope that it will be useful,-->
<!--but WITHOUT ANY WARRANTY; without even the implied warranty of-->
<!--MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General-->
<!--Public License for more details.-->

<!--You should have received a copy of the GNU Lesser General Public License along-->
<!--with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.-->

<script setup>
import { onMounted } from 'vue'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import usarCapaTeselas, {
  props,
  emits,
} from '../../composables/usarCapaTeselas'

// eslint-disable-next-line
const propsSetup = defineProps(props)

// eslint-disable-next-line
const emit = defineEmits(emits)

onMounted(() => {
  usarCapaTeselas(propsSetup, emit).registrar(
    new TileLayer({
      source: new XYZ({ url: propsSetup.url, crossOrigin: 'Anonymous' }),
      // className: this.className,
    })
  )
})
</script>

<template style="display: none"><span /></template>
