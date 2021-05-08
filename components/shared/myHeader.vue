<template>
  <div>
    <v-app-bar
      dense
    >
      <nuxt-link
        to="/"
        class="site-name"
      >
        {{ siteName }}
      </nuxt-link>
      <v-spacer />
      <search-form />
    </v-app-bar>
  </div>
</template>

<script>
import searchForm from '../ui/searchForm.vue'
export default {
  components: { searchForm },
  data() {
    return {
      siteName: process.env.SITE_NAME
    }
  }
}
</script>
<style lang="scss">
a.site-name {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.87);
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>