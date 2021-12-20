<template>
  <div class="my-2">
    <div>
      <v-card v-if="user.disable" class="warning mb-4" light>
        <v-card-title>User Disabled</v-card-title>
        <v-card-subtitle>This user has been disabled! Login accesss has been revoked.</v-card-subtitle>
        <v-card-text>
          <v-btn dark @click="unDisabledUser">
            <v-icon left small>mdi-account-check</v-icon>Enable User
          </v-btn>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Basic Information</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <!-- <div>
              <v-img
                :src="user.avatar"
                aspect-ratio="1"
                class="blue-grey lighten-4 rounded elevation-3"
                max-width="90"
                max-height="90"
              ></v-img>
              <v-btn class="mt-1" small>Edit Avatar</v-btn>
            </div>-->
            <div class="flex-grow-1 pt-2 pa-sm-2">
              <v-text-field v-model="edit.displayname" label="Display name" placeholder="name"></v-text-field>
              <v-text-field v-model="edit.email" label="Email" hide-details></v-text-field>

              <div class="d-flex flex-column">
                <v-checkbox v-model="edit.confirmed" dense label="Email Verified"></v-checkbox>
                <div>
                  <v-btn v-if="!getVerified" @click="sendEmailConfirmationEmail">
                    <v-icon left small>mdi-email</v-icon>Send Verification Email
                  </v-btn>
                </div>
              </div>

              <div class="mt-2" v-if="isEdited">
                <v-btn color="primary" @click="saveEdit">Save</v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-expansion-panels v-model="panel" multiple class="mt-3">
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Actions</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mb-2">
              <div class="title">Reset User Password</div>
              <div class="subtitle mb-2">Sends a reset password email to the user.</div>
              <v-btn class="mb-2" @click="sendResetPasswordEmail">
                <v-icon left small>mdi-email</v-icon>Send Reset Password Email
              </v-btn>
            </div>

            <v-divider></v-divider>

            <div class="my-2">
              <div class="title">Export Account Data</div>
              <div class="subtitle mb-2">Export all the platform metadata for this user.</div>
              <v-btn class="mb-2" download :href="getUserDataDownloadUrl">
                <v-icon left small>mdi-clipboard-account</v-icon>Export User Data
              </v-btn>
            </div>

            <v-divider></v-divider>

            <div class="my-2">
              <div class="error--text title">Danger Zone</div>
              <div class="subtitle mb-2">Full administrator with access to this dashboard.</div>

              <div class="my-2">
                <v-btn v-if="user.role === 'ADMIN'" color="primary" @click="edit.role = 'USER'">
                  <v-icon left small>mdi-security</v-icon>Remove admin access
                </v-btn>
                <v-btn v-else color="primary" @click="edit.role = 'ADMIN'">
                  <v-icon left small>mdi-security</v-icon>Set User as Admin
                </v-btn>
              </div>

              <v-divider></v-divider>

              <div class="subtitle mt-3 mb-2">Prevent the user from signing in on the platform.</div>
              <div class="my-2">
                <v-btn v-if="user.disable" color="warning" @click="unDisabledUser">
                  <v-icon left small>mdi-account-check</v-icon>Enable User
                </v-btn>
                <v-btn v-else color="warning" @click="disableDialog = true">
                  <v-icon left small>mdi-cancel</v-icon>Disable User
                </v-btn>
              </div>

              <v-divider></v-divider>
              <div
                class="subtitle mt-3 mb-2"
              >To delete the user please transfer ownership or delete user's subscriptions.</div>
              <v-btn color="error" @click="deleteDialog = true">
                <v-icon left small>mdi-delete</v-icon>Delete User
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Metadata</v-expansion-panel-header>
          <v-expansion-panel-content class="body-2">
            <span class="font-weight-bold">Created</span>
            {{ user.created | formatDate('lll') }}
            <br />
            <span class="font-weight-bold">Last Sign In</span>
            {{ user.lastSignIn | formatDate('lll') }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Raw Data</v-expansion-panel-header>
          <v-expansion-panel-content>
            <pre class="body-2">{{ user }}</pre>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <!-- disable modal -->
    <v-dialog v-model="disableDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Disable User</v-card-title>
        <v-card-text>Are you sure you want to disable this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="disableDialog = false">Cancel</v-btn>
          <v-btn color="warning" @click="disableUser(); disableDialog = false">Disable</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete modal -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteUser(); deleteDialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      panel: [1],
      deleteDialog: false,
      disableDialog: false,
      editVerified: false,
      edit: {
        confirmed: false
      },
      isEdited: false
    }
  },
  beforeMount() {
    this.edit = { ...this.user }
  },
  computed: {
    getVerified() {
      return this.user.confirmed || this.editVerified
    },
    getUserDataDownloadUrl() {
      return `${process.env.baseURL}/user/data?id=${this.user.id}`
    }
  },
  watch: {
    edit: {
      handler: function (val, oldVal) {
        this.isEdited = JSON.stringify(val) != JSON.stringify(this.user)
      },
      deep: true
    },
    user: {
      handler: function (val, oldVal) {
        this.edit = { ...this.user }
      },
      deep: true
    }
  },
  methods: {
    disableUser() {
      this.$axios.patch(`/api/user/disable/${this.user.id}`).then(() => {
        this.$emit('refresh')

        this.$notifySuccess("User disabled successfully")
      }).catch(err => {
        this.$notifyError(`Error: ${err}`)
      })
    },
    unDisabledUser() {
      this.$axios.patch(`/api/user/undisable/${this.user.id}`).then(() => {
        this.$emit('refresh')

        this.$notifySuccess("User disabled successfully")
      }).catch(err => {
        this.$notifyError(`Error: ${err}`)
      })
    }
    ,
    deleteUser() {
      this.$axios.delete(`/api/user/${this.user.id}`).then(() => {

        this.$notifySuccess("User deleted successfully, redirecting ...")
        this.setTimeout(() => {
          this.$router.push('/users')
        }, 2000);
      }).catch(err => {
        this.$notifyError(`Error: ${err}`)
      })
    }
    ,
    sendEmailConfirmationEmail() {
      const resp = this.$axios.$post(`api/user/sendconfirmationemail`, {
        email: this.user.email
      }).then(() => {
        this.$notifySuccess("Verification Email sent successfully")

      }).catch(err => {
        this.$notifyError(`Error: ${err.message}`)
        return
      })

    },
    sendResetPasswordEmail() {
      this.$axios.$post(`/api/user/resetpassword`, {
        email: this.user.email
      }).then(() => {
        this.$notifySuccess("Password Reset Email sent successfully")

      }).catch(err => {
        this.$notifyError(`Error: ${err.message}`)
        return
      })
    },
    downloadAllUserData() {

    },
    async saveEdit() {
      const pkg = {}
      for (let k of Object.keys(this.user)) {
        if (JSON.stringify(this.user[k]) != JSON.stringify(this.edit[k])) {
          pkg[k] = this.edit[k]
        }
      }
      await this.$axios.$patch(`/api/user/${this.user.id}`, pkg).then(() => {
        this.$notifySuccess("User updated successfully")
        this.$emit('refresh')
        this.editVerified = this.user.confirmed
      }).catch(err => {
        this.$notifyError(`Error: ${err.message}`)
        return
      })
    }
  }
}
</script>
