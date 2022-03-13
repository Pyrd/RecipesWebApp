<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Edit User {{ user.name && `- ${user.name}` }}</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>-->
    </div>

    <div v-if="user.role === 'ADMIN'" class="d-flex align-center font-weight-bold primary--text my-2">
      <v-icon small color="primary">mdi-security</v-icon>
      <span class="ma-1">Administrator</span>
    </div>

    <div class="mb-4">
      <div class="d-flex">
        <span class="font-weight-bold">Email</span>
        <span class="mx-1">
          <copy-label :text="user.email" />
        </span>
      </div>
      <div class="d-flex">
        <span class="font-weight-bold">ID</span>
        <span class="mx-1">
          <copy-label :text="user.id + ''" />
        </span>
      </div>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab>Account</v-tab>
      <v-tab>Information</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <account-tab ref="tabs-account" :user="user" v-on:refresh="refreshUser"></account-tab>
      </v-tab-item>

      <v-tab-item>
        <information-tab ref="tabs-information" :user="user" v-on:refresh="refreshUser"></information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CopyLabel from '~/components/common/CopyLabel'
import AccountTab from '~/components/user/AccountTab'
import InformationTab from '~/components/user/InformationTab'

export default {
  middleware: 'admin',

  components: {
    CopyLabel,
    AccountTab,
    InformationTab
  },
  async asyncData({ $axios, route }) {
    const resp = await $axios.$get(`/api/user/${route.query.id}`)
    return {
      id: route.query.id,
      user: resp
    }
  },
  methods: {
    async refreshUser() {
      this.user = await this.$axios.$get(`/api/user/${this.id}`)
    }
  },
  data() {
    return {
      tab: null,
      breadcrumbs: [
        {
          text: 'Users',
          to: '/users',
          exact: true
        },
        {
          text: 'Edit User'
        }
      ]
    }
  }
}
</script>
