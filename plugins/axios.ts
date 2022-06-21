import { Context } from '@nuxt/types'

export default function ({ $axios, redirect, store }: Context) {
  // request
  $axios.onRequest(async (config: any) => {
    if (
      !!config.headers.authorization &&
      config.url !== '/auth/refresh_token'
    ) {
      try {
        const { token } = await $axios.$get('/auth/refresh_token')

        config.headers.common.authorization = `Bearer ${token}`
      } catch ({ response }) {
        if (response.status === 401) {
          store.commit('users/setCurrentUser', {})
          store.commit('registries/setRegistries', [])
          store.commit('registries/setCurrentRegistry', {})
          store.commit('linked-devices/setLinkedDevices', [])

          redirect('/auth/signin')
        }
      }
    }
    return config
  })
}
