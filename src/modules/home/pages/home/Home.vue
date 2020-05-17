<template>
  <home-component></home-component>
</template>

<style lang="scss">
@import 'src/themes/default/modules/home/index';
</style>

<script>
import HomeComponents from './components';

export default {
  name: 'home-page',

  components: {
    ...HomeComponents
  }
};
</script>
