<script setup>
import { reactive, ref } from 'vue';
import LsegButton from './LsegButton.vue';
import LsegChatMsg from './LsegChatMsg.vue';

const data = reactive({
  chatToggle: false,
});

const emit = defineEmits(['startChat']);

const chatBoxRef = ref(null);

/**
 * @description show/hide conversation chat & fetch required data
 */
const toggleConversationView = () => {
  data.chatToggle = !data.chatToggle;

  if (data.chatToggle) {
    emit('startChat');
  }

  // chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
};

</script>

<template>
  <lseg-button class="btn--rounded absolute bottom-8 right-8" @click="toggleConversationView">
    <i v-if="!data.chatToggle" class="fa-solid fa-robot"></i>
    <i v-else class="fa-solid fa-close"></i>
  </lseg-button>

  <!-- Chat window -->
  <div v-if="data.chatToggle" class="chat__wrapper">
    <div class="chat__main" ref="chatBoxRef">
      <!-- for loop to render messages -->
      <lseg-chat-msg text="Select stock exchange:" :isUser="false"></lseg-chat-msg>
      <lseg-chat-msg text="LSEG" :isUser="true"></lseg-chat-msg>
    </div>

    <div class="chat__prompt">
      <input type="text" name="input" class="chat__input" placeholder="Type a message" disabled>
      <button class="chat__submit" disabled>
        <i class="fa-regular fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat__wrapper {
  @apply absolute flex flex-col justify-end bottom-8 right-24 border-2 border-blue rounded-2xl w-2/3 max-w-[600px] h-[600px];
}

.chat__main {
  @apply relative p-2 overflow-y-auto overscroll-contain;
}

.chat__prompt {
  @apply bg-gray-200 px-2 py-4 flex justify-between rounded-b-2xl;
}

.chat__input {
  @apply w-full bg-transparent mx-2 text-blue outline-none;
}

.chat__submit {
  @apply w-6 h-6 mx-2;

  &:disabled {
    opacity: 0.5;
  }
}
</style>