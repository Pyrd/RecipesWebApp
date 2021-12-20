<template>
    <v-app v-font="$getFont('Poppins', 300)">
        <Nuxt />
    </v-app>
</template>


<script>
import { mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations({
            initTheme: 'app/initTheme'
        }),
    },
    created() {
        this.initTheme({
            context: this,
        },
        )
    }
}
</script>
