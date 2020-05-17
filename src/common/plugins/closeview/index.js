import { mapActions } from 'vuex';

const install = function(Vue, options = {}) {
  Vue.mixin({
    methods: {
      ...mapActions({
        $delSession: 'delSession'
      }),

      $closeView() {
        return this.$delSession(this.$route);
      }
    }
  });
};

export default {
  name: 'close-view',

  install
};
