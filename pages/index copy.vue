<template>
  <v-container fluid>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        sm="11"
        md="10"
        xl="8"
      >
        <v-row v-if="posts.length">
          <v-col
            v-for="(post, i) in posts"
            :key="i"
            cols="12"
            sm="6"
            lg="4"
            xl="3"
          >
            <v-card
              max-width="400"
              class="mx-auto"
            >
              <v-img
                :src="setEyeCatch(post).url"
                :alt="setEyeCatch(post).title"
                :aspect-ratio="16/9"
                max-height="200"
                class="white--text"
              >
                <v-card-text>
                  <v-chip
                    small
                    dark
                    :color="categoryColor(post.fields.category)"
                    to="#"
                    class="font-weight-bold"
                  >
                    {{ post.fields.category.fields.name }}
                  </v-chip>
                </v-card-text>
                <v-card-title>
                  <nuxt-link
                    :to="linkTo('posts', post)"
                  >
                    {{ post.fields.title }}
                  </nuxt-link>
                </v-card-title>
              </v-img>

              <v-card-text>
                {{ post.fields.publishDate }}
                <span :is="draftChip(post)" />
              </v-card-text>

              <v-list-item three-line style="min-height: unset;">
                <v-list-item-subtitle>
                  {{ post.fields.body }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  :to="linkTo('posts', post)"
                >
                  この記事をみる
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div v-else class="text-center">
          投稿された記事はありません。
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import draftChip from '~/components/posts/draftChip.vue'

export default {
  components: {
    draftChip
  },
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
    categoryColor () {
      return (category) => {
        switch (category.fields.name) {
          case 'RubyOnRails' : return '#C73A31'
          case 'Nuxt.js' : return '#236244'
          case 'column' : return 'primary'
          default: return 'grey darken-3'
        }
      }
    }
  }
}
</script>
