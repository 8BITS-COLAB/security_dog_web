import { Context } from '@nuxt/types'

export default ({ redirect, store }: Context) => {
  if (!store.getters['users/getCurrentUser']) {
    return redirect('/auth/signin')
  }
}
