<template>
  <v-app v-font="$getFont('Poppins', 300)">
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
export default {
  // middleware: 'auth',
  speedkitComponents: {
    Appbar: () => import("~/components/core/appbar"),
    Footer: () => import("~/components/core/footer"),
    NavigationDrawer: () => import("~/components/core/navigation-drawer.vue"),
  },
  data() {
    return {};
  },
}
</script>
