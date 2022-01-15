<template>
  <CrudReadEntity
    :basepath="basepath"
    :entity_key="entity_key"
    :api_route="api_route"
    :entity_model="entity_model"
    :data_array="entities"
    :additional_headers="headers"
  >
    <!-- <template v-slot:item.color="{ item }">
      <div>
        <div
          class="rounded-circle"
          :style="`background: ${item.color}; color:{item.color`"
        >{{ item.color }}</div>
      </div>
    </template>-->
  </CrudReadEntity>
  <!-- entity_key
api_route
entity_model
  additional_headers-->
</template>

<script>
import CrudReadEntity from '../../components/crud/readEntity'
export default {
  middleware: "is_admin",

  components: {
    CrudReadEntity
  },
  async asyncData({ $axios }) {
    const entities = await $axios.$get(`/api/tags`)
    return { entities }
  },
  data: () => ({
    basepath: "/tags",
    entity_key: "tags",
    api_route: "/api/tags",
    entity_model: {
      id: "",
      label: "",
      color: "",
    },
    headers: [
      { text: 'Color', align: 'left', value: 'color' },
    ]
  })

}
</script>

<style lang="scss" scoped>
</style>
