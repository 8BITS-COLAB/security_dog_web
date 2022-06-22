<template>
  <v-app dark>
    <div id="container">
      <h1 v-if="error.statusCode === 404">
        <img src="~/assets/404.svg" alt="Not found error" height="540px" />
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <v-btn link to="/" color="primary" dark elevation="0"> Home page </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 20px;
}
</style>
