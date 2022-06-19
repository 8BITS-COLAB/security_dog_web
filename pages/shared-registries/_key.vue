<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card>
      <v-card-title>
        <span class="headline">SHARED REGISTRY</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-text-field
            v-model="password"
            label="Password"
            :rules="passwordRules"
            required
          />
          <v-textarea
            v-if="registry"
            :name="registry.id"
            label="Registry"
            :value="textAreaContent"
          />
        </v-container>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn
          block
          color="secondary"
          :disabled="password.length < 6"
          @click.stop="unlockRegistry"
        >
          UNLOCK
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    password: '',
    registry: null,
    snackbar: false,
    snackbarText: '',
  }),
  methods: {
    ...mapActions('shared-registries', ['unlock']),
    async unlockRegistry() {
      try {
        const registry = await this.unlock({
          key: this.$route.params.key,
          password: this.password,
        })

        this.registry = registry

        this.snackbarText = 'Registry unlocked'
        this.snackbar = true
      } catch (error) {
        this.snackbarText = `Invalid password`
        this.snackbar = true
      }
    },
  },
  computed: {
    passwordRules() {
      return [
        (v) => !!v || 'Password is required',
        (v) => v.length <= 80 || 'Password must be less than 80 characters',
        (v) => v.length >= 6 || 'Password must be at least 6 characters',
      ]
    },
    textAreaContent() {
      return `Site URL: ${this.registry.site_url}\nLogin: ${this.registry.login}\nPassword: ${this.registry.password}`
    },
  },
}
</script>

<style></style>
