<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Recepies</div>
        <v-breadcrumbs :recepie="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="error" class="mr-2" to="/recepies/">Cancel</v-btn>
    </div>

    <v-card>
      <v-row dense class="pa-2 align-center">
        <v-col cols="6">
          <!-- <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedRecepies.length > 0" v-on="on">
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
            @keyup.native="search"
          ></v-text-field>
          <v-btn :loading="isLoading" icon small class="ml-2" @click="refresh">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn color="error" class="mr-2" to="/recepies/">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" class="mr-2" @click="create">Create</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import CopyLabel from '~/components/common/CopyLabel'
import FileInputModal from '~/components/modals/file-input.vue'

export default {
  middleware: 'admin',

  components: {
    CopyLabel,
    FileInputModal
  },
  async asyncData({ $axios }) {
    const resp = await $axios.$get('/api/recepie')
    return {
      recepies: resp
    }
  },
  data() {
    return {
      isLoading: false,
      batchImportLoading: false,
      breadcrumbs: [
        {
          text: 'Recepies',
          disabled: false,
          href: '#'
        },
        {
          text: 'List'
        }
      ],
      recepies: [],
      searchQuery: '',
      selectedRecepies: [],
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        // { text: 'Code', value: 'code' },
        { text: 'Title', value: 'title' },
        { text: 'Duration', align: 'left', value: 'duration' },
        { text: 'Tags', align: 'left', value: 'tags' },
        { text: 'Created', value: 'created' },
        { text: 'Updated', value: 'updated' },
        { text: 'Disabled', value: 'disable' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  watch: {
    selectedRecepies(val) {}
  },
  methods: {
    async searchIngredients() {
      const query = this.searchQuery
      const resp = await this.$axios.$post('/api/recepie/search', {
        query: query
      })
      this.recepies = resp
    },
    async create() {}
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
