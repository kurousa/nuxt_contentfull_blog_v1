<template>
  <div>
    <breadcrumbs :add-items="addBreads" />
    <h1>{{ tag.fields.name }}</h1>
    <div
      v-for="(post, i) in relatedPosts"
      :key="i"
    >
      {{ post.fields.title }}
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ payload, params, error, store, env }) {
    const tag = payload || store.state.tags.find(tag => tag.fields.slug === params.slug)
    if (tag) {
      const relatedPosts = store.getters.associatePosts(tag)
      return { tag, relatedPosts }
    } else {
      error({ statusCode: 400 })
    }
  },
  computed: {
    addBreads() {
      return [{ icon: 'mdi-tag-outline', text: 'Tags', to: '/tags' }]
    }
  }
}
</script>
