import { Context } from '@nuxt/types'

export default function ({ $axios, redirect, store }: Context) {
  // request
  $axios.onRequest(async (config: any) => {
    try {
      if (!config.url.includes('/auth')) {
        const { token } = await $axios.$get('/auth/refresh_token')

        config.headers.authorization = `Bearer ${token}`
      }

      return config
    } catch ({ response }) {
      if ((response as any)?.status === 401) {
        store.commit('users/setCurrentUser', {})
        store.commit('registries/setRegistries', [])
        store.commit('registries/setCurrentRegistry', {})
        store.commit('linked-devices/setLinkedDevices', [])

        return redirect('/auth/signin')
      }
    }
  })
}
