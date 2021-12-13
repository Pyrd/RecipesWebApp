<template>
  <div class="fill-height d-flex align-center justify-center">
    <v-row class="pa-12">
      <v-col cols="12" class="d-flex align-center justify-center flex-column">
        <img
          v-if="error.statusCode === 404"
          style="height:350px;width:100%"
          src="~/assets/images/not_found.svg"
          alt="Error"
        />
        <img v-else style="height:350px;width:100%" src="~/assets/images/alert.svg" alt="Error" />
        <h1 class="text-h3 mt-8" v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
        <h1 v-else>{{ error.message || otherError }}</h1>
        <NuxtLink to="/">Return back home</NuxtLink>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'Not Found',
      otherError: 'An error occurred'
    }
  },
  computed: {
    errorImage() {
      return this.error.statusCode === 404 ? '~/assets/images/not_found.svg' : '~/assets/images/alert.svg'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

h1 {
  font-size: 20px;
}
