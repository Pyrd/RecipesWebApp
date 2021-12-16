<template>
    <div class="my-2">
        <v-card>
            <v-card-title>Settings</v-card-title>
            <v-card-text>
                <Currency />
                <Language />
                <Notifications />
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Currency from "~/components/utilities/Currency.vue"
import Language from "~/components/utilities/Language.vue"
import Notifications from "~/components/utilities/Notifications.vue"
export default {
    components: {
        Currency,
        Language,
        Notifications,

    },
    props: {
        user: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            panel: [1],
            deleteDialog: false,
            disableDialog: false
        }
    }
}
</script>
