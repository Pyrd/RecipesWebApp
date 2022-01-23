<template>
    <v-carousel continuous hide-delimiter-background :height="height" class="img-carousel">
        <v-carousel-item v-for="(slide, i) in items" :key="i" :src="slide.url"></v-carousel-item>
    </v-carousel>
</template>
<script >
export default {
    props: {
        items: {
            type: Array,
            default: () => ([])
        },
        height: {
            type: String,
            default: "100%"
        }
    }
}
</script>
<style lang="scss" scoped>
.img-carousel {
    border-radius: 8px;
}
</style>
