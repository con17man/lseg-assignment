<script setup>
import { nextTick, reactive, ref, toRef } from 'vue';
import LsegButton from './LsegButton.vue';
import LsegChatMsg from './LsegChatMsg.vue';

const props = defineProps({
  stockExchanges: {
    type: Array,
  },
});

const data = reactive({
  chatToggle: false,
  messagePrompts: [
    {
      text: `Hello! Welcome to LSEG. I'm here to help you.`,
      options: null,
      isUser: false,
    },
    {
      text: `Please select a stock exchange:`,
      options: toRef(() => props.stockExchanges),
      isUser: false,
    },
  ],
});

const emit = defineEmits(['startChat']);

const chatBoxRef = ref(null);

const handleOptionChoice = ({ stockExchange, code }) => {
  data.messagePrompts.push({
    text: `${stockExchange}`,
    options: null,
    isUser: true,
  });
};

/**
 * @description show/hide conversation chat & fetch required data
 */
const toggleConversationView = async () => {
  data.chatToggle = !data.chatToggle;

  if (data.chatToggle) {
    emit('startChat');
  }

  // scroll to the bottom of the conversation after DOM update
  await nextTick();
  if (chatBoxRef.value) {
    chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
  }
};
</script>

<template>
  <lseg-button
    class="btn--rounded absolute bottom-8 right-8"
    @click="toggleConversationView"
  >
    <i v-if="!data.chatToggle" class="fa-solid fa-robot"></i>
    <i v-else class="fa-solid fa-close"></i>
  </lseg-button>

  <!-- Chat window -->
  <div v-if="data.chatToggle" class="chat__wrapper">
    <div class="chat__main" ref="chatBoxRef">
      <!-- render messages -->
      <lseg-chat-msg
        v-for="(exchange, i) in data.messagePrompts"
        :key="i"
        :text="exchange.text"
        :options="exchange.options"
        :isUser="exchange.isUser"
        @select-option="handleOptionChoice"
      />
    </div>

    <!-- user input--disabled -->
    <div class="chat__prompt">
      <input
        type="text"
        name="input"
        class="chat__input"
        placeholder="Type a message"
        disabled
      />
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
