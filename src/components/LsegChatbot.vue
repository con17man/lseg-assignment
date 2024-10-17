<script setup>
import { nextTick, reactive, ref, toRef, watch } from 'vue';
import LsegButton from './LsegButton.vue';
import LsegChatMsg from './LsegChatMsg.vue';
import { useMainStore } from '@/stores/store';
import { generateExternalLink } from '@/helpers/utils';

const store = useMainStore();
const props = defineProps({
  stockExchanges: {
    type: Array,
  },
  topStocks: {
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

const emit = defineEmits(['startChat', 'selectExchange', 'selectStock']);

const chatBoxRef = ref(null);

/**
 * @description display user's selection as a message; emit event to update store
 */
const handleSelection = ({
  stockExchange = '',
  stockName = '',
  price = '',
  code,
  type,
}) => {
  if (type === 'exchange') {
    data.messagePrompts.push({
      text: `${stockExchange}`,
      isUser: true,
    });

    emit('selectExchange', code);
  } else if (type === 'stock') {
    data.messagePrompts.push(
      {
        text: `${stockName}`,
        isUser: true,
      },
      {
        text: `Stock price of <b>${stockName}</b> is <u>${Number(price).toFixed(2)}</u>.`,
      },
      {
        text: generateExternalLink(store.selectedExchange, code),
        options: null,
        isEndOfFlow: true,
      },
    );

    emit('selectStock', code);
  }

  scrollToBottom();
};

const handleStockChoice = () => {};

/**
 * @description show/hide conversation chat & fetch required data
 */
const toggleConversationView = async () => {
  data.chatToggle = !data.chatToggle;

  if (data.chatToggle) {
    emit('startChat');
  }

  scrollToBottom();
};

/**
 * @description scroll to the bottom of the conversation after DOM update
 */
const scrollToBottom = async () => {
  await nextTick();
  if (chatBoxRef.value) {
    chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
  }
};

watch(
  () => props.topStocks,
  (newVal, oldVal) => {
    if (newVal.length) {
      data.messagePrompts.push({
        text: `Please select a stock:`,
        options: newVal,
        isUser: false,
      });

      scrollToBottom();
    }
  },
);
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
        :is-end-of-flow="exchange.isEndOfFlow"
        @select-option="handleSelection"
        @select-stock="handleStockChoice"
      />
    </div>

    <!-- user input--disabled -->
    <div class="chat__prompt">
      <input
        type="text"
        name="input"
        class="chat__input"
        placeholder="Pick an option"
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
  @apply relative grid p-2 overflow-y-auto overscroll-contain;
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
