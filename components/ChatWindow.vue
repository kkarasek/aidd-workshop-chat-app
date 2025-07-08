<script setup lang="ts">
const route = useRoute();
const conversationId = Number(route.params.id);

const { data: conversation, pending, error, refresh } = await useFetch(
  `/api/conversations/${conversationId}`
);

const newMessage = ref("");
const isLoading = ref(false);

async function sendMessage() {
  if (!newMessage.value.trim() || isLoading.value) return;
  
  isLoading.value = true;
  try {
    await $fetch("/api/chat", {
      method: "POST",
      body: {
        conversationId: conversationId,
        message: newMessage.value,
      },
    });
    
    newMessage.value = "";
    await refresh();
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    isLoading.value = false;
  }
}

function handleKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
    <!-- Messages Area -->
    <div class="flex-1 overflow-y-auto p-6">
      <div v-if="pending" class="flex items-center justify-center h-32">
        <div class="text-gray-400">Loading chat...</div>
      </div>
      <div v-else-if="error" class="flex items-center justify-center h-32">
        <div class="text-red-400">Error loading chat</div>
      </div>
      <div v-else-if="conversation" class="space-y-4 max-w-4xl mx-auto">
        <div
          v-for="message in conversation.messages"
          :key="message.id"
          class="flex"
          :class="{
            'justify-end': message.role === 'user',
            'justify-start': message.role === 'assistant'
          }"
        >
          <div
            class="max-w-2xl rounded-lg px-4 py-3 border backdrop-blur-sm transition-all duration-200 hover:bg-white/5"
            :class="{
              'bg-white/10 text-gray-100 border-white/20': message.role === 'user',
              'bg-black/20 text-gray-200 border-gray-500/30': message.role === 'assistant'
            }"
          >
            <div class="text-xs font-medium mb-2 opacity-60 uppercase tracking-wider">
              {{ message.role === 'user' ? 'You' : 'AIDD Assistant' }}
            </div>
            <div class="leading-relaxed whitespace-pre-wrap">{{ message.content }}</div>
          </div>
        </div>
        
        <div v-if="isLoading" class="flex justify-start">
          <div class="max-w-2xl rounded-lg px-4 py-3 bg-black/20 border border-gray-500/30 backdrop-blur-sm">
            <div class="text-xs font-medium mb-2 opacity-60 uppercase tracking-wider text-gray-200">AIDD Assistant</div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <span class="text-gray-400 text-sm ml-2">Thinking...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="border-t border-white/10 p-6 bg-black/10 backdrop-blur-sm">
      <div class="max-w-4xl mx-auto">
        <!-- Integrated Input Component -->
        <div class="relative border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 focus-within:border-white/30 transition-all duration-200 backdrop-blur-sm">
          <textarea
            v-model="newMessage"
            @keydown="handleKeyDown"
            placeholder="Type your message..."
            class="w-full resize-none rounded-lg px-4 py-3 pr-14 focus:outline-none bg-transparent text-gray-100 placeholder-gray-400"
            rows="2"
            :disabled="isLoading"
          ></textarea>
          
          <!-- Send Button (Inside Input) -->
          <button
            @click="sendMessage"
            :disabled="!newMessage.trim() || isLoading"
            class="absolute right-2 bottom-2 w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed text-gray-300 hover:text-white disabled:text-gray-600 transition-all duration-200 flex items-center justify-center hover:scale-105 disabled:hover:scale-100"
            :class="{
              'bg-white/15 text-white': newMessage.trim() && !isLoading,
              'opacity-50': !newMessage.trim() || isLoading
            }"
          >
            <svg 
              v-if="!isLoading"
              class="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            <div 
              v-else
              class="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"
            ></div>
          </button>
        </div>
        
        <!-- Helper Text -->
        <div class="flex items-center justify-between mt-2 px-1">
          <span class="text-xs text-gray-500">Press Enter to send, Shift+Enter for new line</span>
          <span class="text-xs text-gray-500">{{ newMessage.length }}/2000</span>
        </div>
      </div>
    </div>
  </div>
</template> 