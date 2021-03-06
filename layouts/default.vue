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
          dark
          color="tertiary"
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
        <transition name="slide-fade">
          <Nuxt />
        </transition>
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
          title: 'DEVICES',
          to: '/devices',
        },
        {
          icon: 'mdi-police-badge',
          title: 'DETECTIVE',
          to: '/detective',
        },
      ],
      title: 'Security Dog',
    }
  },
  computed: {
    ...mapGetters('users', {
      currentUser: 'getCurrentUser',
    }),
    ...mapGetters('feedbacks', {
      feedback: 'getFeedback',
    }),
    isSignedIn() {
      return (
        this.currentUser &&
        this.$route.path !== '/auth/signin' &&
        !this.$route.path.includes('/shared-registries')
      )
    },
  },
  methods: {
    ...mapMutations('feedbacks', ['setFeedback']),
  },
  watch: {
    feedback(newVal) {
      if (newVal) {
        this.snackbarMessage = newVal
        this.snackbar = true
      }
    },
    snackbar(newVal) {
      if (!newVal) {
        this.setFeedback('')
      }
    },
  },
}
</script>

<style scoped>
#logo {
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
