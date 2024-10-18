import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import LsegButton from '../LsegButton.vue';

describe('LsegButton', () => {
  it('should be rendered properly', () => {
    const wrapper = mount(LsegButton, { props: { label: 'CTA Label' } });
    expect(wrapper.text()).toContain('CTA Label');
  });

  it('should render default slot content', () => {
    const wrapper = mount(LsegButton, {
      slots: {
        default: 'Slot Content',
      },
    });
    expect(wrapper.text()).toContain('Slot Content');
  });

  it('should apply rounded class when specified', () => {
    const wrapper = mount(LsegButton, {
      props: { label: 'CTA Label' },
      attrs: { class: 'btn--rounded' },
    });
    expect(wrapper.find('button').classes()).toContain('btn--rounded');
  });

  it('should render properly without a label', () => {
    const wrapper = mount(LsegButton);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).not.toContain('undefined');
  });
});
