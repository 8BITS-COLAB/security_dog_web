<template>
  <div>
    <v-row>
      <v-col cols="10">
        <v-text-field
          v-model="key"
          required
          label="Key"
          :rules="keyRules"
          append-icon="mdi-content-copy"
        />
      </v-col>
      <v-col cols="2">
        <v-btn
          id="investigate"
          elevation="4"
          large
          block
          color="secondary"
          :disabled="key.length < 3"
          @click.stop="fetchBreaches(key)"
        >
          INVESTIGATE
        </v-btn>
      </v-col>
    </v-row>
    <v-list>
      <v-subheader>BREACHES</v-subheader>

      <v-list-item v-for="(breach, i) in breaches" :key="i">
        <v-list-item-icon>
          <v-icon color="primary lighten-5">mdi-lock-open</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            v-text="breach.sources.join(', ')"
          ></v-list-item-title>
          <v-list-item-subtitle>
            {{ breach.password }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-show="breaches.length" />
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DetectivePage',
  data: () => ({
    key: '',
  }),
  computed: {
    ...mapGetters('detective', {
      breaches: 'getBreaches',
    }),
    keyRules() {
      return this.key
        ? [
            (v) => !!v || 'Key is required',
            (v) => v.length >= 3 || 'Key must be at least 3 characters',
          ]
        : [(v) => !!v || 'Key is required']
    },
  },
  methods: {
    ...mapActions('detective', ['fetchBreaches']),
  },

  middleware: ['auth'],
}
</script>

<style scoped></style>
