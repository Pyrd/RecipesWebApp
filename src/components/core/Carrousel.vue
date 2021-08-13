<template>
  <v-row>
    <v-col cols="2" class="d-flex justify-center align-center">
      <v-btn
        icon
        large
        @click="showPrev"
        :aria-label="$t('carousel-left-arrow-label')"
      >
        <v-icon>{{ left_arrow }}</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="8">
      <VueSlickCarousel v-bind="settings" ref="carousel">
        <div v-for="(e, id) in items" :key="id">
          <v-card
            flat
            tile
            width="300px"
            height="380px"
            class="mx-auto carrousel-card"
          >
            <v-img
              height="40%"
              contain
              class="mx-1 my-2"
              :src="require('~/assets/svgs/' + e.icon + '.svg')"
            ></v-img>
            <v-card-title class="flex justify-center font-weight-medium">
              <span>{{ e.name }}</span>
            </v-card-title>
            <v-card-text class="text-center">
              {{ e.text }}
            </v-card-text>
          </v-card>
        </div>
      </VueSlickCarousel>
    </v-col>
    <v-col cols="2" class="d-flex justify-center align-center">
      <v-btn
        icon
        large
        @click="showNext"
        :aria-label="$t('carousel-right-arrow-label')"
      >
        <v-icon>{{ right_arrow }}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

@Component({ components: { VueSlickCarousel } })
export default class Caroussel extends Vue {
  @Prop({ default: [] }) readonly items!: Array<any>
  @Prop({ default: 3 }) readonly windowSize!: number

  private left_arrow = mdiChevronLeft
  private right_arrow = mdiChevronRight
  private settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1625,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  showPrev() {
    let c: any = this.$refs.carousel
    c.prev()
  }
  showNext() {
    let c: any = this.$refs.carousel
    c.next()
  }
}
</script>

<style lang="scss" scoped>
.carrousel {
  width: 100%;
}
.carrousel-card {
  border-radius: 20px !important;
  padding: 1px;
}
</style>
