<script setup>
import LsegAvatar from './LsegAvatar.vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: false
  },
  isUser: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
  <div :class="['chat__msg', { 'chat__msg--user': props.isUser }]">
    <lseg-avatar :isUser="props.isUser" />
    <div class="chat__text">
      {{ props.text }}
    </div>

    <slot /> <!-- ?? -->
  </div>
</template>

<style scoped lang="scss">
.chat__msg {
  @apply w-auto max-w-xs grid grid-cols-chat-msg-bot items-end gap-3 my-1;

  &+.chat__msg:not(.chat__msg--user) {
    @apply my-0;
  }

  &--user {
    @apply grid-cols-chat-msg-user float-right;
  }
}

.chat__text {
  @apply bg-blue-50 p-2 rounded-lg;
}
</style>