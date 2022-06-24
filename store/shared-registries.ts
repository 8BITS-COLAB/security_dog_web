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
    { registryId, password, expireAt }: any
  ) {
    const { id: currentUserId } = rootState.users.currentUser

    const sharedRegistry = await (this as any).$axios.$post(
      `/users/${currentUserId}/shared-registries`,
      {
        registry_id: registryId,
        password,
        expire_at: expireAt,
      }
    )

    return `${process.env.HOST || 'http://localhost:3000'}/shared-registries/${
      sharedRegistry.id
    }`
  },
  async unlock(_context: any, { id, password }: any) {
    const registry = await (this as any).$axios.$get(
      `/shared-registries/${id}`,
      {
        params: { password },
      }
    )

    return registry
  },
}
