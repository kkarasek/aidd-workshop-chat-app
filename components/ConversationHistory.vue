<script setup lang="ts">
const { data: conversations } = await useFetch('/api/conversations');
const route = useRoute();

const currentConversationId = computed(() => {
  return route.params.id ? parseInt(route.params.id.toString()) : null;
});
</script>

<template>
  <div class="space-y-1">
    <NuxtLink
      v-for="conversation in conversations"
      :key="conversation.id"
      :to="`/${conversation.id}`"
      class="block p-3 rounded-lg transition-all duration-200 group relative hover:scale-[1.02]"
      :class="{
        'bg-white/15 text-gray-100 border border-white/25': currentConversationId === conversation.id,
        'text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-transparent hover:border-white/20': currentConversationId !== conversation.id
      }"
    >
      <div class="flex items-center space-x-3">
        <div class="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200"
             :class="{
               'bg-gray-300': currentConversationId === conversation.id,
               'bg-gray-600 group-hover:bg-gray-500': currentConversationId !== conversation.id
             }">
        </div>
        <span class="font-medium text-sm truncate tracking-tight">{{ conversation.topic || `Chat ${conversation.id}` }}</span>
      </div>
      
      <!-- Simple active indicator -->
      <div v-if="currentConversationId === conversation.id" 
           class="absolute inset-y-0 left-0 w-0.5 bg-gray-400 rounded-r-full">
      </div>
    </NuxtLink>
  </div>
</template> 