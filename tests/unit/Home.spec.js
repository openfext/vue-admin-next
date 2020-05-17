import { shallowMount } from '@vue/test-utils';

const Home = {
  name: 'home',
  template: `<h1>Welcome</h1>`
};

describe('Home.vue', () => {
  it('render home correctly', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.text()).toMatch('Welcome');
  });
});
