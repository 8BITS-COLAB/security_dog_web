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
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          id="new-registry"
          elevation="0"
          color="secondary"
          v-bind="attrs"
          v-on="on"
        >
          NEW REGISTRY
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="secondary">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ registry.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              :disabled="isCreateButtonEnabled"
              text
              color="white"
              @click="submit"
            >
              CREATE
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container fluid>
          <v-text-field
            v-model="registry.name"
            :rules="nameRules"
            required
            label="Name"
          />
          <v-text-field
            v-model="registry.site_url"
            :rules="siteRules"
            required
            label="Site URL"
          />
          <v-text-field
            v-model="registry.login"
            :rules="loginRules"
            required
            label="Login"
          />
          <v-text-field
            v-model="registry.password"
            :rules="passwordRules"
            required
            label="Password"
          />
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    snackbarMessage: null,
    snackbar: false,
    registry: {
      name: '',
      site_url: '',
      login: '',
      password: '',
    },
  }),
  methods: {
    ...mapActions('registries', ['createRegistry']),
    async submit() {
      try {
        await this.createRegistry(this.registry)

        this.snackbarMessage = 'Registry created'
        this.snackbar = true
      } catch (error) {
        this.snackbarMessage = 'Error on create registry'
        this.snackbar = true
      } finally {
        this.dialog = false
      }
    },
  },
  computed: {
    isCreateButtonEnabled() {
      return (
        !this.registry.name ||
        !this.registry.site_url ||
        !this.registry.login ||
        !this.registry.password
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
    nameRules() {
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
}
</script>

<style scoped>
#new-registry {
  position: fixed;
  right: 16px;
  top: 12px;
}
</style>
