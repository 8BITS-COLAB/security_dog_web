<template>
  <v-dialog
    v-model="editDialog"
    hide-overlay
    transition="dialog-bottom-transition"
    width="500px"
    fullscreen
  >
    <template #activator="{ on, attrs }">
      <v-list>
        <v-subheader>REGISTRIES</v-subheader>

        <v-list-item-group v-model="currentListItem" color="secondary">
          <registry-list-item
            v-for="(registry, i) in registries"
            :key="i"
            :attrs="attrs"
            :registry="registry"
            :on="on"
          />
        </v-list-item-group>
      </v-list>
    </template>
    <v-card v-if="updatedCurrentRegistry">
      <v-toolbar dark color="secondary">
        <v-btn icon dark @click.stop="editDialog = false">
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
            SAVE
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid>
        <v-text-field
          v-model="updatedCurrentRegistry.name"
          required
          label="Registry Name"
          :rules="nameRules"
          append-icon="mdi-content-copy"
          @click:append="copy(registry.login)"
        />
        <v-text-field
          v-model="updatedCurrentRegistry.site_url"
          required
          label="Site URL"
          :rules="siteRules"
          append-icon="mdi-open-in-new"
          @click:append="openInNewTab(updatedCurrentRegistry.site_url)"
        />
        <v-text-field
          v-model="updatedCurrentRegistry.login"
          required
          label="Login"
          :rules="loginRules"
          append-icon="mdi-content-copy"
          @click:append="copy(updatedCurrentRegistry.login)"
        />
        <v-text-field
          v-model="updatedCurrentRegistry.password"
          required
          label="Password"
          :rules="passwordRules"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-outer-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          append-icon="mdi-content-copy"
          @click:append-outer="setPasswordVisibility"
          @click:append="copy(updatedCurrentRegistry.password)"
        />
        <v-dialog
          v-model="shareDialog"
          persistent
          hide-overlay
          transition="dialog-bottom-transition"
          width="500px"
        >
          <template #activator="{ on, attrs }">
            <v-icon v-bind="attrs" color="secondary" class="ml-2" v-on="on"
              >mdi-share</v-icon
            >
          </template>
          <v-card>
            <v-toolbar dark color="secondary">
              <v-btn icon dark @click.stop="editDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{
                updatedCurrentRegistry.name
              }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  :disabled="isShareButtonDisabled"
                  @click.stop="shareCurrentRegistry"
                >
                  SHARE
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-container fluid>
              <v-text-field
                v-model="sharedRegistry.password"
                required
                label="Password"
                :rules="passwordRules"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-outer-icon="
                  isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                "
                append-icon="mdi-content-copy"
                @click:append-outer="setPasswordVisibility"
                @click:append="copy(sharedRegistry.password)"
              />
              <p>EXPIRES AT</p>
              <v-radio-group v-model="sharedRegistry.expireAt" mandatory>
                <v-radio
                  v-for="(option, i) in sharedRegistryExpireAtOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                ></v-radio>
              </v-radio-group>
            </v-container>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="deleteDialog"
          hide-overlay
          persistent
          transition="dialog-bottom-transition"
          width="500px"
        >
          <template #activator="{ on, attrs }">
            <v-icon v-bind="attrs" color="secondary" class="ml-2" v-on="on"
              >mdi-delete</v-icon
            >
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Delete {{ updatedCurrentRegistry.name }} registry ?
            </v-card-title>
            <v-card-text>
              If you delete this registry, you won't be able to access it
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                elevation="0"
                color="secondary"
                outlined
                @click="deleteDialog = false"
              >
                CANCEL
              </v-btn>
              <v-btn
                elevation="0"
                color="secondary"
                @click.stop="
                  deleteRegistry(updatedCurrentRegistry)
                  deleteDialog = false
                  editDialog = false
                  setFeedback('Registry deleted')
                "
              >
                DELETE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  data: () => ({
    currentListItem: null,
    editDialog: null,
    shareDialog: null,
    deleteDialog: null,
    updatedCurrentRegistry: null,
    isPasswordVisible: false,
    sharedRegistry: {
      registryId: '',
      password: '',
      expireAt: 1000,
    },
  }),
  async fetch() {
    await this.fetchRegistries()
  },
  fetchOnServer: true,
  methods: {
    ...mapActions('registries', [
      'fetchRegistries',
      'updateRegistry',
      'deleteRegistry',
    ]),
    ...mapMutations('registries', ['setCurrentRegistry']),
    ...mapMutations('feedbacks', ['setFeedback']),
    ...mapActions('shared-registries', ['shareRegistry']),
    ...mapActions('users', ['fetchCurrentUser']),

    setPasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    async copy(value) {
      await navigator.clipboard.writeText(value)
      this.setFeedback('Copied to clipboard')
    },
    async saveChanges() {
      try {
        await this.updateRegistry(this.updatedCurrentRegistry)
        this.setFeedback('Registry updated')
      } catch (error) {
        this.setFeedback('Error on update registry')
      } finally {
        this.editDialog = false
      }
    },
    async shareCurrentRegistry() {
      try {
        const url = await this.shareRegistry(this.sharedRegistry)
        this.setFeedback('Link copied to clipboard')

        this.copy(url)
      } catch (error) {
        this.setFeedback('Error on share registry')
      } finally {
        this.shareDialog = false
      }
    },
    openInNewTab(url) {
      window.open(url, '_blank')
    },
  },
  computed: {
    ...mapGetters('registries', {
      registries: 'getRegistries',
      currentRegistry: 'getCurrentRegistry',
    }),
    sharedRegistryExpireAtOptions() {
      return [
        {
          label: '1 minute',
          value: '1m',
        },
        {
          label: '5 minutes',
          value: '5m',
        },
        {
          label: '30 minutes',
          value: '30m',
        },
        {
          label: '1 hour',
          value: '1h',
        },
        {
          label: '6 hours',
          value: '6h',
        },
        {
          label: '1 day',
          value: '1d',
        },
      ]
    },
    isSaveButtonDisabled() {
      return (
        JSON.stringify(this.updatedCurrentRegistry) ===
        JSON.stringify(this.currentRegistry)
      )
    },
    isShareButtonDisabled() {
      return (
        this.sharedRegistry.password.length < 6 ||
        !this.sharedRegistry.registryId ||
        !this.sharedRegistry.expireAt
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
  // fetchOnServer: true,
  watch: {
    currentRegistry: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.updatedCurrentRegistry = { ...newVal }

          this.sharedRegistry.registryId = newVal?.id
        }
      },
      deep: true,
      immediate: true,
    },
  },
  middleware: ['auth'],
}
</script>
