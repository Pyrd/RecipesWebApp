<template>
  <v-app>
    <!-- <v-snackbar v-model="toast.show" :timeout="toast.timeout" :color="toast.color" bottom>
      {{ toast.message }}
      <v-btn
        v-if="toast.timeout === 0"
        color="white"
        text
        @click="toast.show = false"
      >{{ $t('common.close') }}</v-btn>
    </v-snackbar>-->

    <Appbar></Appbar>
    <NavigationDrawer></NavigationDrawer>
    <v-main class="pr-4">
      <v-container fluid>
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
  components: {
    Appbar: () => import('~/components/core/appbar'),
    Footer: () => import('~/components/core/footer'),
    NavigationDrawer: () => import('~/components/core/navigation-drawer.vue')
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('app', {
      theme: (state) => state.theme
    }),
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
    })
  },
  created() {
    this.initTheme({
      context: this
    })

    this.$vuetify.theme.dark = this.theme == 'dark'
    // this.$vuetify.theme.themes.light.primary = this.color
    // this.$vuetify.theme.themes.dark.primary = this.color
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