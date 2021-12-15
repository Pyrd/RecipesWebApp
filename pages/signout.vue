<template>
    <div>
        <v-alert show variant="info">You have been signed out!</v-alert>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    middleware: ['auth'],
    auth: false
})
</script>
