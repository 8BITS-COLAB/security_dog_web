<template>
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
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data: () => ({
    password: '',
    registry: null,
  }),
  methods: {
    ...mapActions('shared-registries', ['unlock']),
    ...mapMutations('feedbacks', ['setFeedback']),
    async unlockRegistry() {
      try {
        const registry = await this.unlock({
          key: this.$route.params.key,
          password: this.password,
        })

        this.registry = registry

        this.setFeedback('Registry unlocked')
      } catch (error) {
        this.setFeedback(`Invalid password`)
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
  middleware: ['auth'],
}
</script>

<style></style>
