<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
      flat
      :raised="hover"
      class="mx-auto image-card v-card--reveal"
      max-width="344"
    >
      <v-img aspect-ratio="1" :src="image" :alt="title">
        <div class="image-card-title">
          <span class="display-1 white--text">{{ title }} </span>
          <v-btn
            elevation="2"
            absolute
            class="project-btn secondary"
            :class="{ 'show-btns': hover }"
            :href="url"
            ><span class="text-wrap"
              >{{ $t('homepage-projects-seemore') }} <br />{{ text }}</span
            ></v-btn
          >
        </div>
      </v-img>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class ImageCard extends Vue {
  @Prop({ default: 'missing_image.png' }) readonly image!: string
  @Prop({ default: 'Title' }) readonly title!: string
  @Prop({ default: 'Text' }) readonly text!: string
  @Prop({ default: '#036358' }) readonly color!: string
  @Prop({ default: 'www.google.com' }) readonly url!: string
}
</script>
<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.project-btn {
  opacity: 0;
  bottom: 10px;
  border-radius: 10px;
  border: 1px solid var(--v-secondary-base);
  text-transform: none;
}
.show-btns {
  opacity: 1;
}

.image-card {
  border-radius: 20px !important;
}

.image-card-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  margin: 0 12px;
}

.image-card-overlay {
  border-radius: 20px;
  background: transparent !important;
}

.v-overlay__scrim {
  background: pink !important;
}
</style>
