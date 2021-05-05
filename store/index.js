import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'
import client from '~/plugins/contentful'

export const state = () => ({
  posts: [],
  categories: [],
  tags: []
})

export const getters = {
  // 記事のアイキャッチ画像設定 画像なしの場合は、デフォルトイメージを表示
  setEyeCatch: () => (post) => {
    if (!!post.fields.image && !!post.fields.image.fields) { 
      return { url: `https:${post.fields.image.fields.file.url}`, title: post.fields.image.fields.title }
    } else {
      return { url: defaultEyeCatch, title: 'defaultImage' }
    }
  },
  // 下書きチップ表示制御
  draftChip: () => (post) => {
    if (!post.fields.publishDate) { return 'draftChip' }
  },
  // 動的リンク生成
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },
  // カテゴリに関連する記事一覧の取得
  relatedPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      if (category.sys.id === catId) { posts.push(state.posts[i]) }
    }
    return posts
  },
  // タグに関連する記事一覧の取得
  associatePosts: state => (currentTag) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      if (post.fields.tags) {
        const tag = post.fields.tags.find(tag => tag.sys.id === currentTag.sys.id)
        if (tag) { posts.push(post) }
      }
    }
    return posts
  }

}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setCategories(state, payload) {
    state.categories = payload
  },
  setLinks(state, entries) {
    state.tags = []
    state.categories = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'tag') { 
        state.tags.push(entry)
      } else if (entry.sys.contentType.sys.id === 'category') {
        state.categories.push(entry)
      }
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort)
  }
}

export const actions = {
  async getPosts({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate', // desc
      include: 1 // 関連先階層の深さ。blogPost -> tagは深さ1の階層。更に先までの取得は2以上になる。
    }).then((res) => {
      commit('setLinks', res.includes.Entry)
      commit('setPosts', res.items)
    }).catch(console.error)
  },
  async getCategories({ commit }) {
    await client.getEntries({
      content_type: 'category',
      order: 'fields.sort' // asc
    }).then(res =>
      commit('setCategories', res.items)
    ).catch(console.error)
  }

}