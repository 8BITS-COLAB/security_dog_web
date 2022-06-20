export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false,
  },
  head: {
    titleTemplate: '%s - security_dog_web',
    title: 'security_dog_web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzZWN1cml0eV9kb2dfYXBpIiwiZXhwIjoxNjU4MTgxODI0LCJpYXQiOjE2NTU3NjI2MjQsImlzcyI6InNlY3VyaXR5X2RvZ19hcGkiLCJqdGkiOiJlY2M0ODgwNS0wNDdiLTRlNDYtYWQ3Ni1hZDQwOGM0OTE2MzkiLCJuYmYiOjE2NTU3NjI2MjMsInN1YiI6ImE3ZTgzYzI3LTZkNTAtNGNhZi04YzJhLWU2M2NhZjNiMzBiNiIsInR5cCI6ImFjY2VzcyJ9.7RJ5ON8rPS-vbSTBkrUQ144AxR3qt2rmQUJnp3djR0MIKOYY4Pp23xSYZx7BgT1LspvOeuAZ-86qozCLeyQVHA',
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Poppins',
      },
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#293462',
          secondary: '#F24C4C',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
