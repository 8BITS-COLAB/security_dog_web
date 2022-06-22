<template>
  <v-app dark>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-navigation-drawer
      v-if="isSignedIn"
      color="primary"
      fixed
      :clipped="clipped"
      :mini-variant="!drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          color="#fff"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-if="isSignedIn"
      elevation="0"
      :clipped-left="clipped"
      fixed
      color="transparent"
      app
      class="d-flex justify-flex-start align-center"
      hide-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <img
          id="logo"
          src="~/assets/logo.png"
          width="140"
          height="80"
          alt="Security Dog logo"
          class="mt-3"
          @click="$router.push('/')"
        />
      </v-toolbar-title>
      <add-registry v-show="$route.path === '/'" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      snackbar: false,
      snackbarMessage: '',
      items: [
        {
          icon: 'mdi-lock',
          title: 'REGISTRIES',
          to: '/',
        },
        {
          icon: 'mdi-devices',
          title: 'LINKED DEVICES',
          to: '/linked_devices',
        },
      ],
      title: 'Security Dog',
    }
  },
  computed: {
    ...mapGetters('users', {
      currentUser: 'getCurrentUser',
    }),
    ...mapGetters('errors', {
      error: 'getError',
    }),
    isSignedIn() {
      return this.currentUser && this.$route.path !== '/auth/signin'
    },
  },
  methods: {
    ...mapMutations('errors', ['setError']),
  },
  watch: {
    error(newVal) {
      if (newVal) {
        this.snackbarMessage = newVal
        this.snackbar = true
      }
    },
    snackbar(newVal) {
      if (!newVal) {
        this.setError('')
      }
    },
  },
}
</script>

<style scoped>
#logo {
  cursor: pointer;
}
</style>
