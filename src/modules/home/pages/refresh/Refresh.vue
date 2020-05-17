<script>
export default {
  name: 'refresh-page',

  computed: {
    path() {
      const encodedPath = this.$route.params.path || '';

      return atob(encodedPath);
    }
  },

  created() {
    this.$router.replace({ path: this.path });
  },

  render: h => h()
};
</script>
