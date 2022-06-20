import { LinkedDevice } from '~/types/linked-device'

type State = {
  linkedDevices: LinkedDevice[]
}

export const state = (): State => ({
  linkedDevices: [],
})

export const getters = {
  getLinkedDevices: (state: State) => state.linkedDevices,
}

export const mutations = {
  setLinkedDevices(state: State, linkedDevices: LinkedDevice[]) {
    state.linkedDevices = linkedDevices
  },
}

export const actions = {
  async fetchLinkedDevices({ commit, rootState }: any) {
    const { data } = await (this as any).$axios.$get(
      `/users/${rootState.users.currentUser.id}/linked_devices`
    )

    commit('setLinkedDevices', data)
  },
  async unlinkLinkedDevice(
    { dispatch, rootState }: any,
    linkedDevice: LinkedDevice
  ) {
    await (this as any).$axios.$delete(
      `/users/${rootState.users.currentUser.id}/linked_devices/${linkedDevice.id}`
    )

    dispatch('fetchLinkedDevices')
  },
}
