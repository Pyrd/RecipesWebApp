<template>
  <div class="my-2">
    <div>
      <v-card v-if="user.disabled" class="warning mb-4" light>
        <v-card-title>Utilisateur </v-card-title>
        <v-card-subtitle>Cet utilisateur est désactivé</v-card-subtitle>
        <v-card-text>
          <v-btn dark @click="user.disabled = false"> <v-icon left small>mdi-account-check</v-icon>Enable User </v-btn>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title
          >Informations Générales
          <v-chip class="ml-2" v-if="user.role == 'ADMIN'" color="success">Admin</v-chip>
          <v-spacer></v-spacer>
          <v-btn solo :disabled="isEdit" color="primary" @click="isEdit = !isEdit">{{
            !isEdit ? 'Modifier' : 'Mode Edition'
          }}</v-btn>
        </v-card-title>
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <div class="flex-grow-1 pt-2 pa-sm-2">
              <v-row>
                <v-col cols="12">
                  <span class="text-caption">Email</span>
                  <v-text-field :readonly="!isEdit" solo v-model="user.email" label="Email" hide-details></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <span class="text-caption">Nom d'affichage</span>
                  <v-text-field
                    :readonly="!isEdit"
                    solo
                    v-model="user.displayname"
                    label="Nom d'affichage"
                    placeholder="name"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-expand-transition>
                <v-row v-show="isEdit">
                  <v-col cols="12">
                    <div class="mt-2 d-flex">
                      <v-btn :disabled="loading" color="error" @click="isEdit = !isEdit">Annuler</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn :loading="loading" color="success" @click="saveEdition">Sauvegarder</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-expand-transition>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-expansion-panels v-model="panel" multiple class="mt-3">
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Metadata</v-expansion-panel-header>
          <v-expansion-panel-content class="body-2">
            <span class="font-weight-bold">Crée le</span>
            {{ user.created | formatDate('lll') }}
            <br />
            <span class="font-weight-bold">Dernière connexion le</span>
            {{ user.lastLogin | formatDate('lll') }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <!-- delete modal -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteDialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  async asyncData({ params, store }) {
    const isEdit = params['edit'] ? true : false
    const user = store.getters['auth/getMe']
    return {
      isEdit,
      user: Object.assign({}, user),
      ref_user: Object.assign({}, user)
    }
  },
  watch: {
    isEdit(val, oldVal) {
      if (!val) {
        this.user = Object.assign(this.ref_user)
      }
    }
  },
  data() {
    return {
      isEdit: false,
      panel: [1],
      deleteDialog: false,
      disableDialog: false,
      // user: null,
      loading: false,
      ref_user: {}
    }
  },
  // computed: {
  //   user() {
  //     return this.$store.getters['auth/getMe']
  //   }
  // },
  methods: {
    // async fetch() {
    //   this.loading = true
    //   const me = await this.$axios.$get('/api/user/me')
    //   this.user = me
    //   this.loading = false
    // }
    async saveEdition() {
      try {
        this.loading = true
        const payload = { email: this.user.email, displayname: this.user.displayname }
        const resp = await this.$axios.$patch(`/api/user/me`, payload)
        this.loading = false
        this.ref_user = resp
        this.isEdit = false
        this.$notifySuccess('Informations misent à jour avec succès !')
      } catch (e) {
        console.log('Error: ' + e.message)
        this.$notifyError("Une erreur s'est produite lors de la sauvegarde !")
      }
    }
  }
}
</script>
