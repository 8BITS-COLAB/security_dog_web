import { Device } from '~/types/device'

type State = {
  devices: Device[]
}

export const state = (): State => ({
  devices: [],
})

export const getters = {
  getDevices: (state: State) => state.devices,
}

export const mutations = {
  setDevices(state: State, devices: Device[]) {
    state.devices = devices
  },
}

export const actions = {
  async fetchDevices({ commit, rootState }: any) {
    const devices = await (this as any).$axios.$get(
      `/users/${rootState.users.currentUser.id}/devices`
    )

    commit('setDevices', devices)
  },
  async unlinkDevice({ dispatch, rootState }: any, device: Device) {
    await (this as any).$axios.$patch(
      `/users/${rootState.users.currentUser.id}/devices?remote_ip=${device.remote_ip}`,
      {
        is_linked: false,
      }
    )

    dispatch('fetchDevices')
  },

  async blockDevice({ dispatch, rootState }: any, device: Device) {
    await (this as any).$axios.$patch(
      `/users/${rootState.users.currentUser.id}/devices?remote_ip=${device.remote_ip}`,
      {
        is_blocked: true,
        is_linked: false,
        is_trusted: false,
      }
    )

    dispatch('fetchDevices')
  },
}
