export default {
  props: {
    width: {
      default: 300,
      type: [Number, String],
      description: "Canvas width in pixels"
    },
    height: {
      default: 300,
      type: [Number, String],
      description: "Canvas height in pixels"
    },
  },
  data: () => ({
    provider: {
      context: null
    }
  }),
  provide() {
    return {
      provider: this.provider
    };
  },
  mounted () {
    this.provider.context = this.$refs.canvas.getContext('2d')
    this.$refs.canvas.width = this.width
    this.$refs.canvas.height = this.height
  },
  template: `
  <div class="canvas">
    <canvas ref="canvas" />
    <slot />
  </div>
`
};
