<template>
  <GMap
    ref="gMap"
    language="en"
    :cluster="{ options: { styles: clusterStyle } }"
    :center="{ lat, lng }"
    :options="{ fullscreenControl: false }"
    :zoom="6"
  >
    <GMapMarker :position="{ lat, lng }">
      <GMapInfoWindow :options="{ maxWidth: 200 }">
        <code> lat: {{ lat }}, lng: {{ lng }} </code>
      </GMapInfoWindow>
    </GMapMarker>
    <GMapCircle />
  </GMap>
</template>

<script>
export default {
  props: {
    lat: {
      type: Number,
      default: 0,
    },
    lng: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    mapStyle: [],
    clusterStyle: [
      {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
        width: 56,
        height: 56,
        textColor: '#fff',
      },
    ],
  }),
}
</script>

<style></style>
