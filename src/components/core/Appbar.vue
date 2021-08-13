<template>
  <div>
    <v-app-bar
      class="app-bar flex px-15"
      :class="`${colored ? 'appbarColored' : 'appbarTransparent'} ${
        drawer ? 'blurry' : ''
      }`"
      app
      fixed
      elevate-on-scroll
    >
      <!-- <v-toolbar-title>
        <nuxt-link :to="localePath('/')" class="appbar-logos">
          <Logo class="" style="max-width: 148px" />
        </nuxt-link>
      </v-toolbar-title> -->
      <!-- <span>{{ $vuetify.breakpoint.name }}</span> -->
      <v-spacer />
      <!-- Appbar Items -->
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="ismobile"
      />
      <div class="box appbar-items" v-else>
        <div class="box appbar-items">
          <nuxt-link
            v-for="(link, i) in links"
            :key="i"
            :to="localePath(link.to)"
            class="item-link-btn font-weight-regular nuxt-link mr-4"
          >
            {{ link.label }}</nuxt-link
          >
        </div>

        <div class="box appbar-items">
          <v-btn
            :aria-label="icon.label"
            v-for="(icon, i) in icons"
            :key="i"
            target="_blank"
            rel="noreferrer"
            :href="icon.to"
            icon
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </div>
        <div class="ml-2">
          <LanguageSwitch />
        </div>
        <div class="ml-2">
          <ThemeSwitch />
        </div>
        <div class="ml-2">
          <LoginSwitch />
        </div>
      </div>
    </v-app-bar>

    <!-- Mobile -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      right
      class="main-nav nav transparent"
      :class="drawer ? 'toggled' : ''"
    >
      <v-card class="pl-2 transparent nav-card" flat height="100%">
        <v-card-actions>
          <v-list color="transparent" width="100%" dense>
            <nuxt-link
              v-for="(link, i) in links"
              :key="i"
              :to="localePath(link.to)"
              class="item-link-btn font-weight-regular nuxt-link mr-4"
            >
              <v-hover v-slot:default="{ hover }">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="font-weight-regular center--text text-center title"
                      :class="`${hover ? 'primary--text' : 'white--text '}`"
                    >
                      {{ link.label }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-hover>
            </nuxt-link>
            <v-divider />
            <v-hover v-slot:default="{ hover }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-medium center--text text-center"
                    :class="`${hover ? 'primary--text' : 'white--text '}`"
                  >
                    <LanguageSwitch />
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-hover>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-medium center--text text-center"
                >
                  <ThemeSwitch />
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Logo from '~/components/core/Logo.vue'
import LanguageSwitch from '~/components/core/LanguageSwitch.vue'
import LoginSwitch from '~/components/core/LoginSwitch.vue'
import ThemeSwitch from '~/components/core/ThemeSwitch.vue'
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import { mdiLinkedin, mdiGithub } from '@mdi/js'
@Component({
  components: { Logo, LanguageSwitch, ThemeSwitch, LoginSwitch },
})
export default class Appbar extends Vue {
  @Prop(Boolean) readonly flat: boolean | undefined
  @Prop(Boolean) readonly color: boolean | undefined

  private drawer: any = null
  private isScrolling: boolean = false
  public isXs: boolean = false
  public links: Array<object> = [
    {
      label: 'Home',
      to: '/',
    },
  ]
  icons: Array<object> = []

  get ismobile() {
    return this.$isMobile()
  }

  get user() {
    return this.$store.getters['modules/auth/getUser']
  }

  private colored: boolean = false
  @Watch('color')
  handleColorChange(val: boolean, oldVal: boolean) {
    this.colored = val
  }
  @Watch('drawer')
  handleDrawer(val: boolean, oldVal: boolean) {
    this.$store.dispatch('modules/navigation/setDrawer', {
      payload: {
        drawer: this.drawer,
      },
    })
  }

  @Watch('ismobile')
  handleMobile(val: boolean, oldVal: boolean) {
    if (!val) {
      if (this.drawer) {
        this.drawer = false
      }
    }
  }

  onScroll(): void {
    const offset = window.pageYOffset
    this.isScrolling = offset > 50
  }
}
</script>

<style lang="scss" scoped>
.nav {
  background: #3333331c !important;
  @include opacity(0);
  -webkit-transform: scale(0.85);
  -ms-transform: scale(0.85);
  transform: scale(0.85);
  @include transition(0.5s);
  &.toggled {
    display: block;
    z-index: 10;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    @include opacity(1);
    @include transition(0.5s);
  }
}

.nav-card {
  padding-top: 66px;
}

ul,
ol {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.v-toolbar {
  transition: 0.6s;
}

.appbarTransparent {
  background-color: #fff0 !important;
}

.transparent-drawer {
  filter: blur(10px);
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
}

.appbarColored {
  background-color: inherit ip !important;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}

.app-bar {
  max-height: 64px;
  z-index: 1337;
}

::v-deep .v-toolbar__content {
  padding: 4px 0px !important;
}

.app-bar-title {
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  white-space: nowrap;
}

.app-bar-title:hover {
  color: var(--v-primary-base);
  transition: all 0.5s ease;
}

.item-link {
  border: none !important;
  background: transparent !important;
}

.item-link-btn.v-btn {
  border: none !important;
  background: transparent !important;
  box-shadow: none;
}

.item-link-btn.v-btn--active {
  border: none !important;
  color: var(--v-contrast-base);
  background: var(--v-primary-base) !important;
}

.v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active::before {
  opacity: 0 !important;
}
</style>
