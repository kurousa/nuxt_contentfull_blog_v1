<template>
  <v-app>
    <my-header />
    <nuxt />
  </v-app>
</template>

<script>
import MyHeader from '../components/shared/myHeader.vue'

export default {
  components: {
    MyHeader
  }
}
</script>