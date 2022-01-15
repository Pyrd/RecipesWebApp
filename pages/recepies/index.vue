<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Recepies</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mr-2" to="/recepies/create">Create</v-btn>
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

      <v-data-table
        v-model="selectedRecepies"
        show-select
        :headers="headers"
        :recepie="recepies"
        class="flex-grow-1"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold">
            #
            <copy-label :text="item.id + ''" />
          </div>
        </template>

        <!-- <template v-slot:item.code="{ item }">
          <div>{{ item.code }}</div>
        </template>-->
        <template v-slot:item.label="{ item }">
          <div>{{ item.label }}</div>
        </template>
        <template v-slot:item.duration="{ item }">
          <div>{{ item.duration_label }} {{ item.duration_unit }}</div>
        </template>duration
        <template v-slot:item.created="{ item }">
          <div>{{ item.created | formatDate('ll') }}</div>
        </template>
        <template v-slot:item.updated="{ item }">
          <div>{{ item.created | formatDate('ll') }}</div>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="actions">
            <v-btn icon :to="localePath(`/recepies/edit?id=${item.id}`)">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CopyLabel from '../../components/common/CopyLabel'
import FileInputModal from '../../components/modals/file-input.vue'

export default {
  middleware: "is_admin",

  components: {
    CopyLabel,
    FileInputModal
  },
  async asyncData({ $axios }) {
    const resp = await $axios.$get('/api/recepie')
    console.log(resp)
    return {
      recepies: resp
    }
  },
  data() {
    return {
      isLoading: false,
      batchImportLoading: false,
      breadcrumbs: [{
        text: 'Recepies',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],
      recepies: [],
      searchQuery: '',
      selectedRecepies: [],
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        // { text: 'Code', value: 'code' },
        { text: 'Title', value: 'title' },
        { text: 'Duration', align: 'left', value: 'duration' },
        { text: 'Created', value: 'created' },
        { text: 'Updated', value: 'updated' },
        { text: 'Disabled', value: 'disable' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],
    }
  },
  watch: {
    selectedRecepies(val) {

    }
  },
  methods: {
    async search() {
      const query = this.searchQuery
      console.log(`SEARCH ${query}`)
      const resp = await this.$axios.$post('/api/recepie/search', {
        query: query
      })
      this.recepies = resp

    },
    open() { },
    async refresh() {
      const resp = await this.$axios.$get('/api/recepie')
      this.recepies = resp
    },
    async batchImportTsv(file) {
      const form = new FormData()
      form.append('file', file)
      try {
        this.batchImportLoading = true
        const resp = await this.$axios.$post('/api/init/recepies', form)
        this.batchImportLoading = false

        this.$notifySuccess(`Imported successfully ${resp.length} new recepies`)
        await this.refresh()
      } catch (err) {
        this.$notifyError(`An error occured: ${err}`)
      }
    }
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
