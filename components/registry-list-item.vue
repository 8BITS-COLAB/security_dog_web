<template>
  <div>
    <v-list-item
      v-bind="attrs"
      v-on="on"
      @click.stop="setCurrentRegistry(registry)"
    >
      <v-list-item-icon>
        <v-icon> mdi-lock</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="registry.name"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    registry: {
      type: Object,
      required: true,
    },
    attrs: {
      type: Object,
      required: true,
    },
    on: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations('registries', ['setCurrentRegistry']),
  },
}
</script>

<style></style>
