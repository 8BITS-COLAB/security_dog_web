/* eslint-disable import/named */
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function ({ $axios }: { $axios: NuxtAxiosInstance }) {
  // request
  $axios.onRequest(async (config: any) => {
    if (
      !!config.headers.authorization &&
      config.url !== '/auth/refresh_token'
    ) {
      const { token } = await $axios.$get('/auth/refresh_token')

      config.headers.common.authorization = `Bearer ${token}`
    }
    return config
  })
}
