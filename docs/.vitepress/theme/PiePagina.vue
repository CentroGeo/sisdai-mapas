<script setup>
import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { theme, page } = useData()
</script>

<template>
  <div>
    <hr />
    <p>
      {{
        theme.lastUpdated?.text ||
        theme.lastUpdatedText ||
        'Última actualización'
      }}:
      <time :datetime="new Date(page.lastUpdated).toISOString()">{{
        new Intl.DateTimeFormat(
          'es-MX',
          theme.lastUpdated?.formatOptions ?? {
            dateStyle: 'short',
            timeStyle: 'short',
          }
        ).format(new Date(page.lastUpdated))
      }}</time>
    </p>
  </div>
</template>
