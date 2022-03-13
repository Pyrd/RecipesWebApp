<template>
  <v-app-bar app clipped-left dark>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title @click="goTo('/')">Recepies</v-toolbar-title>
    <span class="ml-1 mt-6 font-weight-black items-center d-inline-flex primary--text version caption">{{
      version
    }}</span>

    <v-spacer></v-spacer>

    <v-menu bottom offset-y>
      <!-- open-on-hover -->
      <template v-slot:activator="{ on, attrs }">
        <v-avatar color="primary" size="56" v-bind="attrs" v-on="on">U</v-avatar>
      </template>

      <v-list dense>
        <v-list-item v-for="(item, i) in navigation" :key="i" @click="navigationReducer(item)">
          <v-list-item-icon class="mr-4">
            <client-only>
              <unicon :name="item.icon" fill="contrast"></unicon>
            </client-only>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="line-height: 1.125rem">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data: () => {
    return {
      navigation: [
        { icon: 'user-circle', title: 'Profile', action: 'goto', data: '/user/profile' },
        { icon: 'setting', title: 'Settings', action: 'goto', data: '/user/settings' },
        { icon: 'signout', title: 'Sign out', action: 'signout', data: '' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      version: 'app/getVersion',
      drawer: 'app/getDrawer' || true
    })
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('app/setDrawer', !this.drawer)
    },
    goTo(path) {
      this.$router.push(path)
    },
    async signOut() {
      console.log('Good bye :)')
      await this.$fire.auth.signOut()
      this.$store.dispatch('auth/disconnect')
    },
    navigationReducer(e) {
      switch (e.action) {
        case 'goto':
          this.goTo(e.data)
          break
        case 'signout':
          this.signOut()
          break
      }
    }
  }
}
</script>

<style scoped>
.version {
  font-size: 0.75rem;
  line-height: 0.8rem;
}
</style>