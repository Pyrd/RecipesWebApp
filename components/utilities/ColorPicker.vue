<template>
    <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <div class="pa-3 primary rounded-circle d-inline-block"></div>
            </v-btn>
        </template>

        <!-- dropdown card -->
        <v-card>
            <v-color-picker v-model="model" mode="hexa" :swatches="swatches" show-swatches></v-color-picker>
        </v-card>
    </v-menu>
</template>

<script>
/*
|---------------------------------------------------------------------
| Toolbar Notifications Component
|---------------------------------------------------------------------
|
| Quickmenu to check out notifications
|
*/
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        swatches: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            model: this.value
        }
    },
    watch: {
        model(currentValue) {
            this.$emit('input', currentValue)
        }
    }
}
</script>
