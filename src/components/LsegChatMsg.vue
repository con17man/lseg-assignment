<script setup>
import { ref } from 'vue';
import LsegAvatar from './LsegAvatar.vue';

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
});

const emit = defineEmits(['select-option']);
const disableList = ref(false);
</script>

<template>
  <div
    :class="['chat__msg', props.isUser ? 'chat__msg--user' : 'chat__msg--bot']"
  >
    <lseg-avatar :isUser="props.isUser" />
    <div class="chat__text">
      {{ props.text }}
    </div>

    <ul v-if="props.options" class="chat__options">
      <button
        v-for="(item, index) in props.options"
        :key="index"
        @click.once="
          emit('select-option', item);
          disableList = true;
        "
        :disabled="disableList ? 'disabled' : false"
        class="chat__option"
      >
        <p class="option__name">{{ item.stockExchange }}</p>
        <p class="option__code">{{ item.code }}</p>
      </button>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.chat__msg {
  @apply w-auto max-w-sm grid grid-cols-chat-msg-bot items-end gap-x-3 gap-y-0 mt-1;

  &--user {
    @apply grid-cols-chat-msg-user float-right;
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
  cursor: pointer;
  @apply border-2 border-blue-200 rounded-md;

  &:hover,
  &:focus {
    @apply border-blue text-white bg-blue;
  }

  & .option__name {
    text-align: left;
  }

  & .option__code {
    text-align: right;
  }
}
</style>
