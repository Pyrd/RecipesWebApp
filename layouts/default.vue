<template>
  <v-app v-font="$getFont('Poppins', 300)">
    <v-snackbar v-model="toast.show" :timeout="toast.timeout" :color="toast.color" bottom>
      {{ toast.message }}
      <v-btn
        v-if="toast.timeout === 0"
        color="white"
        text
        @click="toast.show = false"
      >{{ $t('common.close') }}</v-btn>
    </v-snackbar>

    <Appbar></Appbar>
    <NavigationDrawer></NavigationDrawer>
    <v-main>
      <v-container>
        <transition name="fade" mode="out-in">
          <Nuxt />
        </transition>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  speedkitComponents: {
    Appbar: () => import("~/components/core/appbar"),
    Footer: () => import("~/components/core/footer"),
    NavigationDrawer: () => import("~/components/core/navigation-drawer.vue"),
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('app', ['toast']),

    isRouterLoaded: function () {
      if (this.$route.name !== null) return true

      return false
    },
    currentLayout: function () {
      const layout = this.$route.meta.layout || 'default'

      return layout + 'Layout'
    }
  },
  methods: {
    ...mapMutations({
      initTheme: 'app/initTheme' // attacher `this.add()` à `this.$store.commit('increment')`
    }),
  },
  created() {
    this.initTheme({
      context: this,
    },
    )
  }
}
</script>

<style scoped>
/**
 * Transition animation between pages
 */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>