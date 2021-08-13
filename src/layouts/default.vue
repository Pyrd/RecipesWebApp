<template>
  <v-app class="background">
    <Appbar id="appbar" :color="color" :flat="flat" />
    <v-main class="main" :class="getDrawer ? 'blurry' : ''">
      <nuxt />
    </v-main>
    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        @click="toTop"
        class="goToTopBtn"
        :aria-label="$t('gototop-btn-label')"
      >
        <v-icon>{{ iconArrowUp }}</v-icon>
      </v-btn>
    </v-scale-transition>
    <Footer />
  </v-app>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { mdiArrowUp } from '@mdi/js'
import Appbar from '~/components/core/Appbar.vue'
import Footer from '~/components/core/Footer.vue'
// import { NuxtI18nSeo } from 'nuxt-i18n/types/nuxt-i18n'
@Component({
  components: {
    Appbar,
    Footer,
  },
  // middleware: ['authentification'],
})
export default class DefaultLayout extends Vue {
  iconArrowUp = mdiArrowUp
  fab = false
  color = false
  flat = false

  head() {
    // const i18nSeo: any = this.$nuxtI18nSeo()
    // let i18nlinks: Array<object> = []
    // for (let e of i18nSeo.link) {
    //   if (e.hreflang != null) {
    //     if (e.hreflang.length > 2) {
    //       i18nlinks.push(e)
    //     }
    //   } else {
    //     i18nlinks.push(e)
    //   }
    // }
    // return {
    //   htmlAttrs: {
    //     myAttribute: 'My Value',
    //     ...i18nSeo.htmlAttrs,
    //   },
    //   meta: [
    //     {
    //       hid: 'description',
    //       name: 'description',
    //       content: 'My Custom Description',
    //     },
    //     ...i18nSeo.meta,
    //   ],
    //   links: [...i18nlinks],
    // }
  }

  get getDrawer() {
    return this.$store.getters['modules/navigation/getDrawer']()
  }

  created() {
    this.$store.dispatch('modules/theme/initTheme', {
      payload: {
        context: this,
      },
    })
  }
  beforeMount() {
    const top = window.pageYOffset || 0
    if (top <= 60) {
      this.color = false
      this.flat = true
    }
  }

  onScroll(e: any) {
    if (typeof window === 'undefined') return
    const top = window.pageYOffset || e.target.scrollTop || 0
    this.fab = top > 60
  }
  toTop() {
    this.$vuetify.goTo(0)
  }

  @Watch('fab')
  handleFab(value: boolean) {
    if (value) {
      this.color = true
      this.flat = false
    } else {
      this.color = false
      this.flat = true
    }
  }
}
</script>

<style scoped>
.main {
  margin-bottom: 20px;
}

.v-main {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

.goToTopBtn {
  background: #000000b0 !important;
  bottom: 62px;
}
</style>
