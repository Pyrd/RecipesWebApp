<template>
  <v-card class="error-card text-left">
    <v-card-title v-if="error.statusCode === 404">
      <span class="display-4">404</span>
      <span class="display-2">{{ pageNotFound }}</span>
    </v-card-title>
    <v-card-title v-else>
      {{ otherError }}
    </v-card-title>
    <v-card-text class="mt-4">
      <nuxt-link class="nuxt-link primary--text title" :to="localePath('/')">
        Go to the homepage
      </nuxt-link>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "Looks like the page you're looking for has been moved.",
      otherError: 'An error occurred',
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
    let i18nlinks = []
    for (let e of i18nSeo.link) {
      if (e.hreflang != null) {
        if (e.hreflang.length > 2) {
          i18nlinks.push(e)
        }
      } else {
        i18nlinks.push(e)
      }
    }
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
      htmlAttrs: {
        myAttribute: 'My Value',
        ...i18nSeo.htmlAttrs,
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My Custom Description',
        },
        ...i18nSeo.meta,
      ],
      links: [...i18nlinks],
    }
  },
}
</script>

<style lang="scss" scoped>
span {
  word-break: normal;
}

.error-card {
  display: flex;
  height: 100%;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  box-shadow: none !important;
  border: none !important;
  width: 90%;
  background: transparent !important;
}

.page-enter,
.page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}
</style>
