<script setup lang="ts">
const router = useRouter();

async function startNewConversation() {
  const newConversation = await $fetch("/api/conversations", {
    method: "POST",
  });
  if (newConversation) {
    await router.push(`/${newConversation.id}`);
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full p-8">
    <div class="text-center max-w-lg">
      <!-- Icon with transparent background -->
      <div class="w-20 h-20 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center mx-auto mb-8 backdrop-blur-sm hover:bg-white/15 transition-all duration-200 hover:scale-[1.02]">
        <div class="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
      </div>
      
      <!-- Title -->
      <h1 class="text-5xl font-medium mb-4 tracking-tight text-white">
        AIDD Chat
      </h1>
      
      <!-- Subtitle -->
      <p class="text-gray-400 mb-12 text-lg leading-relaxed max-w-md mx-auto">
        Your intelligent assistant for everything. Start a conversation and explore what's possible.
      </p>
      
      <!-- CTA Button -->
      <button 
        @click="startNewConversation"
        class="bg-white/10 hover:bg-white/15 text-gray-200 px-8 py-4 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-[1.02] backdrop-blur-sm"
      >
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>Start New Conversation</span>
        </div>
      </button>
      
      <!-- Subtle decoration -->
      <div class="mt-16 flex justify-center space-x-1">
        <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
        <div class="w-1 h-1 bg-gray-500 rounded-full"></div>
        <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  </div>
</template> 