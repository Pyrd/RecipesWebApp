<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Users</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary">Create User</v-btn>
    </div>

    <v-card>
      <!-- users list -->
      <v-row dense class="pa-2 align-center">
        <v-col cols="6">
          <!-- <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedUsers.length > 0" v-on="on">
                  Actions
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </transition>
            </template>
            <v-list dense>
              <v-list-item @click>
                <v-list-item-title>Verify</v-list-item-title>
              </v-list-item>
              <v-list-item @click>
                <v-list-item-title>Disable</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>-->
        </v-col>
        <v-col cols="6" class="d-flex text-right align-center">
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            placeholder="e.g. filter for id, email, name, etc"
            @keyup.enter="searchUser(searchQuery)"
          ></v-text-field>
          <v-btn :loading="isLoading" icon small class="ml-2" @click>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        v-model="selectedUsers"
        show-select
        :headers="headers"
        :items="users"
        :search="searchQuery"
        class="flex-grow-1"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold">
            #
            <copy-label :text="item.id + ''" />
          </div>
        </template>

        <template v-slot:item.email="{ item }">
          <div class="d-flex align-center py-1">
            <v-avatar size="32" class="elevation-1 grey lighten-3">
              <v-img :src="item.avatar" />
            </v-avatar>
            <div class="ml-1 caption font-weight-bold">
              <copy-label :text="item.email" />
            </div>
          </div>
        </template>
        <template v-slot:item.name="{ item }">
          <div class="d-flex align-center py-1">
            <div class="ml-1 caption font-weight-bold">
              {{ item.firstname }}
              {{ item.lastname }}
            </div>
          </div>
        </template>
        <template v-slot:item.confirmed="{ item }">
          <v-icon v-if="item.confirmed" small color="success">mdi-check-circle</v-icon>
          <v-icon v-else small>mdi-circle-outline</v-icon>
        </template>

        <template v-slot:item.disable="{ item }">
          <v-chip :color="item.disable ? 'error' : 'success'">{{
            item.disable ? 'disabled' : 'active' | capitalize
          }}</v-chip>
        </template>

        <template v-slot:item.role="{ item }">
          <v-chip label small class="font-weight-bold" :color="item.role === 'ADMIN' ? 'primary' : undefined">{{
            item.role | capitalize
          }}</v-chip>
        </template>

        <template v-slot:item.created="{ item }">
          <div>{{ item.created | formatDate('ll') }}</div>
        </template>

        <template v-slot:item.lastLogin="{ item }">
          <div>{{ item.lastLogin | formatDate('lll') }}</div>
        </template>

        <template v-slot:item.action="{ item }">
          <div class="actions">
            <v-btn icon :to="localePath(`/users/edit?id=${item.id}`)">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CopyLabel from '~/components/common/CopyLabel'

export default {
  middleware: 'admin',

  components: {
    CopyLabel
  },
  async asyncData({ $axios }) {
    const resp = await $axios.$get('/api/user')
    return {
      users: resp
    }
  },
  data() {
    return {
      isLoading: false,
      breadcrumbs: [
        {
          text: 'Users',
          disabled: false,
          href: '#'
        },
        {
          text: 'List'
        }
      ],

      searchQuery: '',
      selectedUsers: [],
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Confirmed', value: 'confirmed' },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Role', value: 'role' },
        { text: 'Created', value: 'created' },
        { text: 'Last SignIn', value: 'lastLogin' },
        { text: 'Disabled', value: 'disable' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  watch: {
    selectedUsers(val) {}
  },
  methods: {
    searchUser() {},
    open() {}
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
