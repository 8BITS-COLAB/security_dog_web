import { Context } from '@nuxt/types'

export default ({ store, redirect }: Context) => {
  const currentUser = store.getters['users/getCurrentUser']

  if (currentUser?.id) {
    return redirect('/auth/signin')
  }
}
