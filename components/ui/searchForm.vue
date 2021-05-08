<template>
  <div>
    <v-form
      @submit.prevent="submit"
    >
      <v-text-field
        ref="searchForm"
        v-model="query"
        hide-details
        placeholder="キーワードを入力"
        dense
      />
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    validQuery() {
      return !!this.query && // 空欄の場合false
        !/^\s+$/.test(this.query) && // 空白のみの場合false
        this.$route.query.q !== this.query // 値変化なしの場合false
    }
  },
  methods: {
    submit() {
      if (this.validQuery) {
        this.$router.push({ path: '/search', query: { q: this.query } })
        this.query = ''
        this.$refs.searchForm.blur()
      }
    }
  }
}
</script>
