<template>
  <div class="text-center">
    <v-dialog v-model="dialog" :width="width">
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <v-btn
            v-bind="attrs"
            dark
            v-on="on"
            :color="hover ? 'success' : 'primary'"
            solo
            class="mr-2"
            :loading="loading"
          >
            <v-icon>mdi-import</v-icon>
            {{ activator_btn }}
          </v-btn>
        </v-hover>
      </template>
      <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on" :loading="loading">{{ activator_btn }}</v-btn> -->
      <!-- <slot v-bind="attrs" v-bind:on="on" :loading="loading" name="btn"></slot> -->

      <v-card>
        <v-card-title class="text-h5">{{ title }}</v-card-title>

        <v-card-text>
          <v-file-input
            v-model="file"
            color="deep-purple accent-4"
            counter
            label="File input"
            placeholder="Select your file"
            prepend-icon="mdi-file"
            outlined
            :show-size="1000"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip color="deep-purple accent-4" dark label small>{{ text }}</v-chip>
            </template>
          </v-file-input>
        </v-card-text>
        <slot />
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="error" text @click="submit">{{ error_btn }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit">{{ success_btn }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    activator_btn: {
      type: String,
      default: 'Input'
    },
    success_btn: {
      type: String,
      default: 'Import file'
    },
    success_btn: {
      type: String,
      default: 'Import file'
    },
    error_btn: {
      type: String,
      default: 'Cancel'
    },
    title: {
      type: String,
      default: 'Import file'
    },
    width: {
      type: Number,
      default: 600
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      file: null
    }
  },
  methods: {
    submit() {
      this.dialog = false
      this.$emit('submit', this.file)
      this.file = null
    }
  }
}
</script>