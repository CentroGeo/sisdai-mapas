<script setup>
import ResaAtoyac from "./../.vitepress/components/usos/atoyac.vue";
</script>

<ResaAtoyac />

# SisdaiLeyenda

Uso:

```vue
<SisdaiLeyenda para="<String(id de la capa)>"></SisdaiLeyenda>
```

Uso avanzado:

```vue
<SisdaiLeyenda
  v-for="capa in capas"
  :para="capa.nombre"
  :tipo="capa.tipo"
  grupo="grupoParaRadios"
></SisdaiLeyenda>
```

## Ejemplo

<<< @/.vitepress/components/usos/atoyac.vue
