<template>
  <v-list>
    <v-subheader>DEVICES</v-subheader>
    <v-list-item v-for="(device, i) in devices" :key="i">
      <v-list-item-icon>
        <v-icon>mdi-devices</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="device.remote_ip"></v-list-item-title>
      </v-list-item-content>
      <v-tooltip bottom color="secondary">
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            color="secondary"
            elevation="0"
            text
            @click.stop="unlinkDevice(device)"
            v-on="on"
          >
            <v-icon>mdi-link-variant-off</v-icon>
          </v-btn>
        </template>
        <span>UNLINK DEVICE</span>
      </v-tooltip>
    </v-list-item>
    <v-divider v-show="devices.length" />
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DevicesPage',
  data: () => ({
    currentListItem: null,
  }),
  methods: {
    ...mapActions('devices', ['fetchDevices', 'unlinkDevice']),
  },
  computed: {
    ...mapGetters('devices', {
      devices: 'getDevices',
    }),
  },
  async fetch() {
    await this.fetchDevices()
  },
  fetchOnServer: true,
  middleware: ['auth'],
}
</script>

<style></style>
