<template>
    <div>
        <v-alert show variant="warning">This is a secure page!</v-alert>
        <v-row>
            <v-col md="8">
                <v-card title="State">
                    <pre>{{ state }}</pre>
                </v-card>
            </v-col>
            <v-col md="4">
                <v-card title="Scopes" class="mv-2">
                    User:
                    <v-badge>{{ $auth.hasScope('user') }}</v-badge>Test:
                    <v-badge>{{ $auth.hasScope('test') }}</v-badge>Admin:
                    <v-badge>{{ $auth.hasScope('admin') }}</v-badge>
                </v-card>
                <v-card v-if="$auth.strategy.token" title="token" class="mv-2">
                    <div
                        style="white-space: nowrap; overflow: auto"
                    >{{ $auth.strategy.token.get() || '-' }}</div>
                </v-card>
                <v-card v-if="$auth.strategy.refreshToken" title="refresh token">
                    <div
                        style="white-space: nowrap; overflow: auto"
                    >{{ $auth.strategy.refreshToken.get() || '-' }}</div>
                </v-card>
            </v-col>
        </v-row>
        <hr />
        <v-btn-group>
            <v-btn @click="$auth.fetchUser()">Fetch User</v-btn>
            <v-btn @click="refreshTokens">Refresh Tokens</v-btn>
            <v-btn @click="$auth.logout()">Logout</v-btn>
        </v-btn-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    computed: {
        state() {
            return JSON.stringify(this.$auth.$state, undefined, 2)
        }
    },
    methods: {
        refreshTokens() {
            this.$auth.refreshTokens().catch((err) => {
                console.log(err)
            })
        }
    }
})
</script>