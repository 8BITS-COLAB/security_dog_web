<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      persistent
      hide-overlay
      transition="dialog-bottom-transition"
      width="500px"
    >
      <template #activator="{ on, attrs }">
        <v-list>
          <v-list-item-group v-model="currentListItem" color="secondary">
            <v-list-item
              v-for="(registry, i) in registries"
              :key="i"
              v-bind="attrs"
              v-on.native="on"
              @click.stop="setCurrentRegistry(registry)"
            >
              <v-list-item-icon>
                <v-icon> mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="registry.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
      <v-card v-if="updatedCurrentRegistry">
        <v-toolbar dark color="secondary">
          <v-btn icon dark @click.stop="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ updatedCurrentRegistry.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              :disabled="isSaveButtonDisabled"
              @click.stop="saveChanges"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container fluid>
          <v-text-field
            v-model="updatedCurrentRegistry.name"
            required
            label="Name"
            :rules="usernameRules"
          />
          <v-text-field
            v-model="updatedCurrentRegistry.site_url"
            required
            label="Site URL"
            :rules="siteRules"
          />
          <v-text-field
            v-model="updatedCurrentRegistry.login"
            required
            label="Login"
            :rules="loginRules"
          />
          <v-text-field
            v-model="updatedCurrentRegistry.password"
            required
            label="Password"
            :rules="passwordRules"
            type="password"
            @click.stop="copy(updatedCurrentRegistry.password)"
          />
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  data: () => ({
    currentListItem: null,
    dialog: null,
    snackbar: null,
    snackbarMessage: null,
    updatedCurrentRegistry: null,
  }),
  async fetch() {
    await this.fetchCurrentUser()
    await this.fetchRegistries()
  },
  methods: {
    ...mapActions('registries', ['fetchRegistries', 'updateRegistry']),
    ...mapMutations('registries', ['setCurrentRegistry']),
    ...mapActions('users', ['fetchCurrentUser']),
    async copy(value) {
      await navigator.clipboard.writeText(value)
      this.snackbarMessage = 'Copied to clipboard'
      this.snackbar = true
    },
    async saveChanges() {
      await this.updateRegistry(this.updatedCurrentRegistry)
      this.snackbarMessage = 'Registry updated'
      this.snackbar = true
      this.dialog = false
    },
  },
  computed: {
    ...mapGetters('registries', {
      registries: 'getRegistries',
      currentRegistry: 'getCurrentRegistry',
    }),
    isSaveButtonDisabled() {
      return (
        JSON.stringify(this.updatedCurrentRegistry) ===
        JSON.stringify(this.currentRegistry)
      )
    },
    loginRules() {
      return this.currentRegistry
        ? [
            (v) => !!v || 'Login is required',
            (v) => v.length <= 80 || 'Login must be less than 80 characters',
            (v) => v.length >= 3 || 'Login must be at least 3 characters',
          ]
        : [(v) => !!v || 'Login is required']
    },
    passwordRules() {
      return this.currentRegistry
        ? [
            (v) => !!v || 'Password is required',
            (v) => v.length <= 80 || 'Password must be less than 80 characters',
            (v) => v.length >= 6 || 'Password must be at least 6 characters',
          ]
        : [(v) => !!v || 'Password is required']
    },
    usernameRules() {
      return this.currentRegistry
        ? [
            (v) => !!v || 'Username is required',
            (v) => v.length <= 80 || 'Username must be less than 80 characters',
            (v) => v.length >= 3 || 'Username must be at least 3 characters',
          ]
        : [(v) => !!v || 'Username is required']
    },
    siteRules() {
      return this.currentRegistry
        ? [
            (v) => !!v || 'Site URL is required',
            (v) => v.length <= 80 || 'Site URL must be less than 80 characters',
            (v) => v.length >= 3 || 'Site URL must be at least 3 characters',
          ]
        : [(v) => !!v || 'Site URL is required']
    },
  },
  // fetchOnServer: true,
  watch: {
    currentRegistry: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.updatedCurrentRegistry = { ...newVal }
        }
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
