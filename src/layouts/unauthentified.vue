<template>
  <v-app class="background">
    <v-main class="main">
      <nuxt />
    </v-main>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
@Component({
  components: {},
  // middleware: 'unauthentified',
})
export default class UnauthentifiedLayout extends Vue {
  head() {
    const i18nSeo: any = this.$nuxtI18nSeo()

    let i18nlinks: Array<object> = []
    for (let e of i18nSeo.link) {
      if (e.hreflang != null) {
        if (e.hreflang.length > 2) {
          i18nlinks.push(e)
        }
      } else {
        i18nlinks.push(e)
      }
    }

    return {
      htmlAttrs: {
        myAttribute: 'My Value',
        ...i18nSeo.htmlAttrs,
      },
      meta: [
        {
          hid: 'description',
          name: 'Login',
          content: 'Login with email & password or with google sign-in',
        },
        ...i18nSeo.meta,
      ],
      links: [...i18nlinks],
    }
  }
  // get auth() {
  //   if (this.$store.getters['modules/auth/isLoggedIn']) {
  //     console.log('Auth getter')
  //     // this.$router.push({ path: this.localePath('/') })
  //   }
  //   return
  // }

  // @Watch('auth')
  // handleAuthChanged(val: boolean, old: boolean) {
  //   console.log('AuthGetterHandler', val)
  //   if (val) {
  //     console.log('AuthGetterHandler REDIRECTTTT', val)

  //     this.$router.push({ path: this.localePath('/') })
  //   }
  // }
  // middleware({ store, redirect, app }: any) {
  //   // Si l'utilisateur n'est pas authentifié
  //   console.log(
  //     'inline middleware',
  //     store.getters['modules/auth/isLoggedIn'],
  //     app.$fire.auth.currentUser
  //   )
  //   if (store.getters['modules/auth/isLoggedIn']) {
  //     console.log('inline')
  //     return redirect(app.localePath('/'))
  //   }
  // }
  // unsubscribe: any

  // mounted() {
  //   this.unsubscribe = this.$store.subscribe((mutation, state) => {
  //     console.log('mutation', mutation)
  //     if (mutation.type == 'modules/auth/SET_AUTH_USER') {
  //       console.log('mutation redirect', mutation)

  //       this.$router.push({ path: this.localePath('/') })
  //     }
  //   })
  // }
  // beforeDestroy() {
  //   this.unsubscribe()
  // }
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
