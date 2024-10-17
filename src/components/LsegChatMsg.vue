<script setup>
import { ref } from 'vue';
import LsegAvatar from './LsegAvatar.vue';
import { useMainStore } from '@/stores/store';

const store = useMainStore();

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: false,
  },
  isUser: {
    type: Boolean,
    default: false,
  },
  isEndOfFlow: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['select-option']);

const disableList = ref(false);

const handleOptionSelect = item => {
  emit('select-option', {
    ...item,
    type: !store.selectedExchange ? 'exchange' : 'stock',
  });
  disableList.value = true;
};
</script>

<template>
  <div
    :class="['chat__msg', props.isUser ? 'chat__msg--user' : 'chat__msg--bot']"
  >
    <lseg-avatar :isUser="props.isUser" />
    <div class="chat__text" v-html="props.text" />

    <ul v-if="props.options" class="chat__options">
      <button
        v-for="(item, index) in props.options"
        :key="index"
        @click.once="handleOptionSelect(item)"
        :disabled="disableList ? 'disabled' : false"
        class="chat__option"
      >
        <p class="option__name">{{ item.stockExchange || item.stockName }}</p>
        <p class="option__code">{{ item.code }}</p>
      </button>
    </ul>

    <!-- TO DO -- flow variations -->
    <ul v-if="!!isEndOfFlow" class="chat__options">
      <button class="chat__option">Select another stock</button>
      <button class="chat__option">Select another exchange</button>
      <button class="chat__option">Start over</button>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.chat__msg {
  @apply w-auto max-w-sm grid grid-cols-chat-msg-bot items-end gap-x-3 gap-y-0 mt-1;

  &--user {
    @apply grid-cols-chat-msg-user justify-self-end;
  }
}

.chat__text {
  @apply bg-blue-50 p-2 rounded-lg;
}

.chat__options {
  @apply col-start-2;
}

.chat__option {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 4em;
  padding: 0.25em;
  margin: 0.5em 0;
  text-align: center;
  cursor: pointer;
  @apply border-2 border-blue-200 rounded-md;

  &:hover,
  &:focus {
    @apply border-blue text-white bg-blue;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & .option__name {
    text-align: left;
  }

  & .option__code {
    text-align: right;
  }
}
</style>
