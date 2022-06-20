<template>
  <v-list>
    <v-subheader>LINKED DEVICES</v-subheader>
    <v-list-item v-for="(item, i) in linkedDevices" :key="i">
      <v-list-item-icon>
        <v-icon>mdi-devices</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="item.remote_ip"></v-list-item-title>
      </v-list-item-content>
      <v-tooltip bottom color="secondary">
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            color="secondary"
            elevation="0"
            text
            @click.stop="unlinkLinkedDevice(item)"
            v-on="on"
          >
            <v-icon>mdi-link-variant-off</v-icon>
          </v-btn>
        </template>
        <span>UNLINK DEVICE</span>
      </v-tooltip>
    </v-list-item>
    <v-divider />
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LinkedDevices',
  data: () => ({
    currentListItem: null,
  }),
  methods: {
    ...mapActions('linked-devices', [
      'fetchLinkedDevices',
      'unlinkLinkedDevice',
    ]),
  },
  computed: {
    ...mapGetters('linked-devices', {
      linkedDevices: 'getLinkedDevices',
    }),
  },
  async fetch() {
    await this.fetchLinkedDevices()
  },
  fetchOnServer: true,
}
</script>

<style></style>
