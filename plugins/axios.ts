import { Context } from '@nuxt/types'

export default function ({ $axios, redirect, store }: Context) {
  // request
  $axios.onRequest(async (config: any) => {
    try {
      if (!config.headers.authorization) {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
          config.headers.authorization = `Bearer ${accessToken}`
        }
      }
      if (!config.url.includes('/auth')) {
        const { access_token: accessToken } = await $axios.$get(
          '/auth/refresh-token'
        )

        config.headers.authorization = `Bearer ${accessToken}`
        localStorage.setItem('accessToken', accessToken)

        // if (config.method !== 'get') {
        //   const { csrf_token: csrfToken } = await $axios.$get(
        //     '/auth/csrf-token'
        //   )

        //   config.headers['X-CSRF-Token'] = csrfToken
        // }
      }

      return config
    } catch ({ response }) {
      if ((response as any)?.status === 401) {
        store.commit('users/setCurrentUser', {})
        store.commit('registries/setRegistries', [])
        store.commit('registries/setCurrentRegistry', {})
        store.commit('devices/setDevices', [])

        return redirect('/auth/signin')
      }
    }
  })
}
