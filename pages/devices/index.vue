<template>
  <v-list>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template #activator="{ on, attrs }">
        <v-subheader>DEVICES</v-subheader>

        <v-list-item-group v-model="currentListItem" color="secondary">
          <v-list-item
            v-for="(device, i) in devices"
            v-bind="attrs"
            :key="i"
            v-on="on"
            @click="currentDevice = device"
          >
            <v-list-item-icon>
              <v-icon color="primary lighten-5">mdi-devices</v-icon>
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
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
              </template>
              <span>UNLINK DEVICE</span>
            </v-tooltip>
            <v-tooltip bottom color="secondary">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  color="secondary"
                  elevation="0"
                  text
                  @click.stop="blockDevice(device)"
                  v-on="on"
                >
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </template>
              <span>BLOCK DEVICE</span>
            </v-tooltip>
          </v-list-item>
          <v-divider v-show="devices.length" />
        </v-list-item-group>
      </template>
      <v-card v-if="currentDevice">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ currentDevice.remote_ip }}</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <v-container fluid>
          <v-row>
            <v-col cols="4">
              <v-text-field
                disabled
                label="Remote IP"
                :value="currentDevice.remote_ip"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                disabled
                label="Latitude"
                :value="currentDevice.lat"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                disabled
                label="Longitude"
                :value="currentDevice.lng"
              />
            </v-col>
          </v-row>
          <signin-map :lat="currentDevice.lat" :lng="currentDevice.lng" />
        </v-container>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DevicesPage',
  data: () => ({
    currentListItem: null,
    dialog: false,
    currentDevice: null,
  }),
  methods: {
    ...mapActions('devices', ['fetchDevices', 'unlinkDevice', 'blockDevice']),
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
