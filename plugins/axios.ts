import { Context } from '@nuxt/types'

export default function ({ $axios, redirect, store }: Context) {
  // request
  $axios.onRequest(async (config: any) => {
    try {
      if (!config.headers.common.authorization) {
        return redirect('/auth/signin')
      }

      if (config.url !== '/auth/refresh_token') {
        const { token } = await $axios.$get('/auth/refresh_token')

        config.headers.common.authorization = `Bearer ${token}`
      }
      return config
    } catch ({ response }) {
      if (response?.status === 401) {
        store.commit('users/setCurrentUser', {})
        store.commit('registries/setRegistries', [])
        store.commit('registries/setCurrentRegistry', {})
        store.commit('linked-devices/setLinkedDevices', [])

        return redirect('/auth/signin')
      }
    }
  })
}
