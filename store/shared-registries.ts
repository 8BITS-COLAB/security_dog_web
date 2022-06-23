import { Registry } from '../types/registry'

type State = {
  sharedRegistries: Registry[]
}

export const state = (): State => ({
  sharedRegistries: [],
})

export const actions = {
  async shareRegistry(
    { rootState }: any,
    { registryId, password, expiresAt }: any
  ) {
    const { id: currentUserId } = rootState.users.currentUser

    await (this as any).$axios.$post(
      `/users/${currentUserId}/shared-registries`,
      {
        registry_id: registryId,
        password,
        expires_at: expiresAt,
      }
    )

    return {
      password,
      key: `${currentUserId}@${registryId}`,
    }
  },
  async unlock(_context: any, { key, password }: any) {
    const { data } = await (this as any).$axios.$get(
      `/shared-registries/${key}`,
      {
        params: {
          password,
        },
      }
    )

    return data
  },
}
