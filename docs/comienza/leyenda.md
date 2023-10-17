<script setup>
import ResaAtoyac from "./../.vitepress/components/usos/atoyac.vue";
</script>

# SisdaiLeyenda

Uso:

```vue
<SisdaiLeyenda para="<String(id de la capa)>" />
```

Uso avanzado:

```vue
<SisdaiLeyenda
  v-for="capa in capas"
  :para="capa.nombre"
  :tipo="capa.tipo"
  grupo="grupoParaRadios"
/>
```

## Ejemplo

<ResaAtoyac />

<<< @/.vitepress/components/usos/atoyac.vue
