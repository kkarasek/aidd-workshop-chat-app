<script setup lang="ts">
const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<template>
  <nav class="bg-black/10 border-b border-white/10 px-6 py-4 backdrop-blur-sm">
    <div class="flex items-center justify-between">
      <button 
        @click="goHome"
        class="flex items-center space-x-3 text-gray-200 hover:text-white transition-all duration-200 group hover:scale-[1.02]"
      >
        <div class="w-7 h-7 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/15 transition-all duration-200">
          <svg class="w-4 h-4 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <span class="text-xl font-medium tracking-tight text-white">
          AIDD Chat
        </span>
      </button>
      
      <div class="text-sm text-gray-400 font-medium">
        AI Assistant
      </div>
    </div>
  </nav>
</template> 