import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LsegChatbot from '../LsegChatbot.vue';
import LsegButton from '../LsegButton.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('LsegChatbot', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders the toggle button with chat closed initially', () => {
    const wrapper = mount(LsegChatbot);

    // Check if the button contains the robot icon
    const button = wrapper.findComponent(LsegButton);
    expect(button.html()).toContain('fa-robot');

    // Check if chat is initially closed
    const chatWrapper = wrapper.find('.chat__wrapper');
    expect(chatWrapper.exists()).toBe(false);
  });

  it('toggles the chat window when the button is clicked', async () => {
    const wrapper = mount(LsegChatbot);

    // Check that chat window is initially not visible
    expect(wrapper.find('.chat__wrapper').exists()).toBe(false);

    // Click button to open chat
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.chat__wrapper').exists()).toBe(true);

    // Click button to close chat
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.chat__wrapper').exists()).toBe(false);
  });

  it('renders the initial greeting message', async () => {
    const wrapper = mount(LsegChatbot);

    // Open chat
    await wrapper.find('button').trigger('click');

    // Check if the initial greeting message is rendered
    expect(wrapper.text()).toContain(
      "Hello! Welcome to LSEG. I'm here to help you.",
    );
  });
});
