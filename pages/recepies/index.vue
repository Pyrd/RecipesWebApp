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
        <v-col cols="6"> </v-col>
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
      <!-- {{ recepies }} -->
      <v-data-table
        v-model="selectedRecepies"
        show-select
        :expanded.sync="expanded"
        item-key="id"
        show-expand
        :headers="headers"
        :items="recepies"
        class="flex-grow-1"
        @item-expanded="getItemsOfRecepie"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold">
            #
            <copy-label :text="item.id + ''" />
          </div>
        </template>

        <template v-slot:item.name="{ item }">
          <div>{{ item.name }}</div>
        </template>
        <template v-slot:item.total_duration="{ item }">
          <div>{{ item.total_duration }} min</div>
        </template>
        <template v-slot:item.author="{ item }">
          <div>{{ item.author ? item.author.displayname : '' }}</div>
        </template>
        <template v-slot:item.created="{ item }">
          <div>{{ item.created | formatDate('ll') }}</div>
        </template>
        <template v-slot:item.updated="{ item }">
          <div>{{ item.created | formatDate('ll') }}</div>
        </template>
        <template v-slot:item.access="{ item }">
          <div>
            <v-chip :color="item.access == 0 ? 'success' : 'primary'">{{
              item.access == 0 ? 'Public' : 'Private'
            }}</v-chip>
          </div>
        </template>
        <template v-slot:item.status="{ item }">
          <div class="centered">
            <v-select
              hide-details
              dense
              outlined
              v-model="item.status"
              :items="recepies_status"
              v-on:change="updateItem(item)"
            >
              <template v-slot:selection="{ item }">
                <v-chip :color="getStatusChipColor(item)">{{ formatStatus(item) }}</v-chip>
              </template>
            </v-select>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="d-flex flex-row justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-hover v-slot="{ hover }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    :color="hover ? 'error' : ''"
                    icon
                    :to="localePath(`/recepies/edit?id=${item.id}`)"
                  >
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-hover>
              </template>
              <span>Delete</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-hover v-slot="{ hover }">
                  <v-btn v-bind="attrs" v-on="on" :color="hover ? 'primary' : ''" icon>
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                </v-hover>
              </template>
              <span>View</span>
            </v-tooltip>
          </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col cols="12" md="4" class="pt-4 px-12">
                <div class="d-flex justify-space-between">
                  <p class="font-weight-bold">Rating</p>
                  <p>WIP</p>
                </div>

                <div class="d-flex justify-space-between">
                  <p class="font-weight-bold">Cost</p>
                  <p>{{ item.cost }}</p>
                </div>
                <div class="d-flex justify-space-between">
                  <p class="font-weight-bold">Difficulty</p>
                  <p>{{ item.difficulty }}</p>
                </div>
                <div class="d-flex justify-space-between">
                  <p class="font-weight-bold">Estimated preparation time:</p>
                  <p>{{ item.duration.estimated_prepare_time }} min</p>
                </div>
                <div class="d-flex justify-space-between">
                  <p class="font-weight-bold">Estimated cook time:</p>
                  <p>{{ item.duration.estimated_cook_time }} min</p>
                </div>
                <div class="d-flex justify-space-between">
                  <p class="font-weight-bold">Estimated rest time</p>
                  <p>{{ item.duration.estimated_rest_time }} min</p>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <p class="font-weight-bold">Ingrédients</p>
                <v-row>
                  <v-list class="fwidth pr-8">
                    <div v-for="(e, i) in item.items" :key="i">
                      <v-list-item outlined class="fwidth outlined-list-item mb-2">
                        <v-list-item-avatar v-if="e.item != null">
                          <img :src="e.item.images[0].url" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold subtitle"
                            >{{ e.count }} {{ e.unit }} {{ e.item ? e.item.label_fr : 'loading' }}
                            {{ e.complement }}</v-list-item-title
                          >
                          <v-list-item-subtitle v-html="e.code"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex flex-column">
                  <p class="font-weight-bold">Description</p>
                  <p>{{ item.description || 'No description available' }}</p>
                </div>
                <div class="d-flex flex-column">
                  <p class="font-weight-bold">Instructions</p>
                  <v-list class="fwidth pr-8" v-if="item.instructions && item.instructions.length > 0">
                    <v-list-item
                      v-for="(e, i) in item.instructions"
                      :key="i"
                      outlined
                      class="fwidth outlined-list-item mb-2"
                    >
                      <v-list-item-content>
                        <v-list-item-title class="subtitle">
                          <span class="font-weight-bold">{{ i + 1 }}.</span>
                          {{ e }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <p v-else class="mt-4 ml-8">Pas d'instructions :(</p>
                </div>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CopyLabel from '../../components/common/CopyLabel'
import FileInputModal from '../../components/modals/file-input.vue'
import { recepies_status } from '~/configs/shared/recepie-types.constants'
export default {
  middleware: 'is_admin',

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
      recepies_status,
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
        { text: 'Name', value: 'name' },
        { text: 'Duration', align: 'left', value: 'total_duration' },
        { text: 'Author', align: 'left', value: 'author' },
        { text: 'Created', value: 'created' },
        { text: 'Updated', value: 'updated' },
        { text: 'Access', value: 'access' },
        { text: 'Status', value: 'status', width: '70px' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],
      expanded: []
    }
  },
  watch: {
    selectedRecepies(val) {}
  },
  computed: {},
  methods: {
    async search() {
      const query = this.searchQuery
      console.log(`SEARCH ${query}`)
      const resp = await this.$axios.$post('/api/recepie/search', {
        query: query
      })
      this.recepies = resp
    },
    open() {},
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
    },
    getStatusChipColor(status) {
      switch (status) {
        case 'DELETED':
          return 'error'
        case 'TO_BE_APPROVED':
          return 'warning'
        case 'ACTIVE':
          return 'primary'
      }
      return ''
    },
    formatStatus(status) {
      try {
        if (!status || typeof status != 'string') {
          return ''
        }
        const tmp = status.replaceAll('_', ' ').toLowerCase()
        return tmp.charAt(0).toUpperCase() + tmp.slice(1)
      } catch (e) {
        return ''
      }
    },
    async updateItem(item) {
      try {
        await this.$axios.$patch(`/api/recepie/${item.id}`, item)
        this.$notifySuccess('Item updated successfully')
      } catch (e) {
        console.error(e)
        this.$notifyError('An error occurred while updating')
      }
    },
    async getItemsOfRecepie(item) {
      const id = item.item.id
      item.loading
      try {
        const resp = await this.$axios.$get(`/api/recepie/${id}/items`)
        item.item.items = resp
      } catch (e) {
        console.error(e)
        this.$notifyError('An error occurred while fetching data')
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

.v-input--is-focused > div:nth-child(1) > div:nth-child(1) {
  box-shadow: none !important;
}
</style>
