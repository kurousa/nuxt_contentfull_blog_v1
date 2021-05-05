export default async ({ store }) => {
  // 投稿一覧
  if (!store.state.posts.length) { await store.dispatch('getPosts') }
  // カテゴリ一覧
  // if (!store.state.categories.length) { await store.dispatch('getCategories') }
}