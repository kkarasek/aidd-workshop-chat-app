<script setup lang="ts">
useHead({
  title: 'AIDD Chat',
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { name: 'description', content: 'AIDD Chat - Your intelligent AI assistant for everything. Start conversations and explore what\'s possible.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' },
  ],
})
</script>

<template>
  <div class="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
