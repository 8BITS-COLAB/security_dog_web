<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400px"
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
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
        <v-toolbar dark color="secondary">
          <v-btn dark icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ registry.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn :disabled="isCreateButtonEnabled" dark text @click="submit">
              CREATE
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container fluid>
          <v-text-field
            v-model="registry.name"
            required
            label="Registry Name"
            :rules="nameRules"
            append-icon="mdi-content-copy"
            @click:append="copy(registry.name)"
          />
          <v-text-field
            v-model="registry.site_url"
            required
            label="Site URL"
            :rules="siteRules"
            append-icon="mdi-content-copy"
            @click:append="copy(registry.site_url)"
          />
          <v-text-field
            v-model="registry.login"
            required
            label="Login"
            :rules="loginRules"
            append-icon="mdi-content-copy"
            @click:append="copy(registry.login)"
          />
          <v-text-field
            v-model="registry.password"
            required
            label="Password"
            :rules="passwordRules"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-outer-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            append-icon="mdi-content-copy"
            @click:append-outer="setPasswordVisibility"
            @click:append="copy(registry.password)"
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
    isPasswordVisible: false,
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

        this.$emit('on-event', 'Registry created')
      } catch (error) {
        this.$emit('on-event', 'Error on creating registry')
      } finally {
        this.dialog = false
        this.registry = {
          name: '',
          site_url: '',
          login: '',
          password: '',
        }
      }
    },
    async copy(value) {
      await navigator.clipboard.writeText(value)

      this.$emit('on-event', 'Copied to clipboard')
    },
    setPasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
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
