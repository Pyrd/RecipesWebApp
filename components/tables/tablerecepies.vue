<template>
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
        <v-chip :color="item.access == 0 ? 'success' : 'primary'">{{ item.access == 0 ? 'Public' : 'Private' }}</v-chip>
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
              <v-btn v-bind="attrs" v-on="on" :color="hover ? 'error' : ''" icon @click="deleteItem(item.id)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-hover>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{ hover }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                :color="hover ? 'primary' : ''"
                icon
                :to="localePath(`/recepies/edit?id=${item.id}`)"
              >
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
</template>

<script>
import CopyLabel from '../../components/common/CopyLabel'
import { recepies_status } from '~/configs/shared/recepie-types.constants'
import { getStatusChipColor, formatStatus } from '~/utils/recepies-helper'
export default {
  components: {
    CopyLabel
  },

  props: {
    activator_btn: {
      type: String,
      default: 'Input'
    }
  },
  data() {
    return {
      recepies_status
    }
  },
  methods: {
    getStatusChipColor,
    formatStatus
  }
}
</script>