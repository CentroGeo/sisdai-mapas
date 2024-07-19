<script setup>
</script>

<div class="contenedor ancho-fijo m-y-10">
  <SisdaiMapa
    class="demo-discos-graduados"
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <template #panel-izquierda-vis>
      <SisdaiLeyenda para="glifo_sup_sembrada_herbicida_07_est_p_po" />
    </template>
    <SisdaiCapaXyz :posicion="1" />
    <SisdaiCapaWms
      capa="glifo_sup_sembrada_herbicida_07_est_p"
      estilo="glifo_sup_sembrada_herbicida_07_est_p_po"
      id="glifo_sup_sembrada_herbicida_07_est_p_po"
      nombre="Herbicida orgánico (hectáreas)"
      :posicion="4"
      url="https://gema.conahcyt.mx/geoserver/wms"
    />
  </SisdaiMapa>
</div>
