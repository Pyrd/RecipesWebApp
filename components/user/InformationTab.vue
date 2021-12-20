<template>
  <v-card class="my-2">
    <v-card-title>User Information</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="edit.displayname" label="Display Name"></v-text-field>
            <v-text-field v-model="edit.firstname" label="First Name"></v-text-field>
            <v-text-field v-model="edit.lastname" label="Last Name"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="edit.birth_date"
                  label="Birthday date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="edit.birth_date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
            <v-radio-group v-model="edit.gender" label="Gender">
              <v-radio label="Male" value="M"></v-radio>
              <v-radio label="Female" value="F"></v-radio>
              <v-radio label="Other" value="O"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <div class="d-flex">
          <v-btn @click="reset">Reset</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-show="isEdited" @click="update">Save</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    menu: false,
    gender: 'male',
    _user: {},
    edit: {},
    isEdited: false
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    edit: {
      handler: function (val, oldVal) {
        this.isEdited = JSON.stringify(val) != JSON.stringify(this.user)
      },
      deep: true
    }
  },
  beforeMount() {
    this.edit = { ...this.user }
    this._user = { ...this.user }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    async update() {
      this.$axios.patch(`/api/user/${this.user.id}`, {
        ...this.edit
      }).then(() => {
        this._user = { ...this.edit }
        this.$notifySuccess("User updated successfully")
      }).catch(err => {
        this.$notifyError(`Error: ${err}`)
      })
    },
    reset() {
      this.edit = { ...this._user }
    }
  }
}
</script>
