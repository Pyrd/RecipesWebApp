<template>
    <div>
        <div class="carousel-wrapper px-6 hidden-md-and-up">
            <Carousel :items="images" height="350px"></Carousel>
        </div>
        <div class="carousel-wrapper px-6 hidden-sm-and-down">
            <v-row>
                <v-col v-if="images[0]" :cols="images[1] ? 6 : 12" class="fheight">
                    <img
                        :src="images[0].url"
                        class="grid-img left-img"
                        alt="Photo-0"
                        :class="{
                            'right-top-img': !images[1],
                            'right-bot-img': !images[1]
                        }"
                    />
                </v-col>
                <v-col v-if="images[1]" :cols="images[3] ? 3 : 6" class="fheight grid-col">
                    <v-row no-gutters class="fhalfheight">
                        <v-col cols="12" class="fheight">
                            <img
                                :src="images[1].url"
                                alt="Photo-1"
                                class="grid-img"
                                :class="{
                                    'right-top-img': !images[3],
                                    'right-bot-img': !images[2],
                                    'pb-2': images[2] != null
                                }"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters v-if="images[2]" class="fhalfheight">
                        <v-col cols="12" class="fheight">
                            <img
                                :src="images[2].url"
                                alt="Photo-2"
                                class="grid-img pt-2"
                                :class="images[3] ? '' : 'right-bot-img'"
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col v-if="images[3]" cols="3" class="fheight grid-col">
                    <v-row no-gutters class="fhalfheight">
                        <v-col cols="12" v-if="images[3]" class="fheight">
                            <img
                                :src="images[3].url"
                                alt="Photo-3"
                                class="grid-img right-top-img"
                                :class="{
                                    'right-bot-img': images[4] == null,
                                    'pb-2': images[4] != null
                                }"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters v-if="images[4]" class="fhalfheight">
                        <v-col cols="12" class="p-relative fheight" v-if="images[4]">
                            <img :src="images[4].url" alt="Photo-4" class="grid-img right-bot-img" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-btn
                v-if="images.length > 0"
                class="more-right"
                bottom
                right
                absolute
                small
                @click="openGalleryModal"
            >
                <v-icon>mdi-view-grid</v-icon>Afficher toutes les photos
            </v-btn>
        </div>
        <v-dialog v-model="openGalleryModalState" width="66%">
            <v-row>
                <v-col v-for="(n, i) in images" :key="i" class="d-flex child-flex" cols="4">
                    <v-img :src="n.url" aspect-ratio="1" class="grey lighten-2">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>
        </v-dialog>
    </div>
</template>

<script>
import Carousel from "./Carousel.vue";

export default {
    components: { Carousel },
    props: {
        images: {
            type: Array,
            default: () => ([])
        },
    },
    data: () => ({

        openGalleryModalState: false,
    }),
    methods: {
        openGalleryModal() {
            this.openGalleryModalState = true;
        },

        closeGalleryModal() {
            this.openGalleryModalState = false;

        }
    }
}
</script>

<style lang="scss">
.dialog-photo {
    padding: 12px;
    background: #2d2d2dbd;
}

.left-img {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
.right-top-img {
    border-top-right-radius: 8px;
}
.right-bot-img {
    border-bottom-right-radius: 8px;
}

.more-right {
    right: 64px;
}
.grid-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.grid-col {
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.fullscreen-btn {
    position: absolute;
    // top: 16px;
    // right: 16px;

    top: 125px;
    right: 100px;
}

.carousel-wrapper {
    margin-top: 10px;
    width: 100%;
    max-height: 550px;
    display: flex;
    position: relative;
    border-radius: 15px;
}
</style>
