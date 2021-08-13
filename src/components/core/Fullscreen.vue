<template>
  <div class="fullscreen">
    <fullscreen
      ref="fullscreen"
      class="fullscreen-wrapper"
      fullscreenClass="fullscreen-activated"
    >
      <slot />
    </fullscreen>
  </div>
</template>
<script>
import Fullscreen from 'vue-fullscreen/src/component.vue'
export default {
  components: { Fullscreen },
  props: {
    activate: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    activate: {
      immediate: true,
      handler: function (val, oldVal) {
        this.toggle(val)
      },
    },
  },

  methods: {
    toggle(val) {
      if (!this.$refs['fullscreen']) return
      if (val) {
        this.$refs['fullscreen'].toggle(val)
      } else {
        this.$refs['fullscreen'].toggle()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fullscreen {
  width: 100%;
  height: 100%;
}
.fullscreen-wrapper {
  width: 100%;
  height: 100%;
}

.fullscreen-activated {
  background: rgb(255, 255, 255) none repeat scroll 0% 0% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
