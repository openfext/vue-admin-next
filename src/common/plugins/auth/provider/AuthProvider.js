export default {
  name: 'auth-provider',

  render() {
    return this.$scopedSlots.default({
      provider: this.getProvider()
    });
  },

  methods: {
    getProvider() {
      const services = this.$services || {};

      if (services.authService) {
        return services.authService;
      }

      return {};
    }
  }
};
