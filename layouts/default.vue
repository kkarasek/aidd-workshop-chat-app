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
  <div class="flex h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
    <!-- Sidebar -->
    <div class="w-80 bg-black/20 border-r border-white/10 flex flex-col backdrop-blur-sm">
      <div class="p-5 border-b border-white/10">
        <h1 class="text-xl font-medium text-gray-100 mb-4 tracking-tight">Conversations</h1>
        <button 
          @click="startNewConversation"
          class="w-full bg-white/10 hover:bg-white/15 text-gray-200 px-4 py-3 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-[1.02]"
        >
          <div class="flex items-center justify-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>New Chat</span>
          </div>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-3">
        <ConversationHistory />
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <AppNavbar />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template> 