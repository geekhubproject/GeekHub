<template>
  <div class="adopt-sticky">
    <v-card
      flat
      v-for="(n, index) in list"
      :key="n._id"
      class="my-3 mx-3">
      <v-layout row wrap>
        <v-flex xs1 class="ml-1 mt-4 pt-1 text-md-center" >
          <v-icon v-if="n.bookmark" style="cursor: pointer;color: #536DFE"
                  @click="mediumBookmark(index, 'delete', n._id)">star</v-icon>
          <v-icon v-else style="cursor: pointer" @click="mediumBookmark(index, 'add', n._id)">
            star_border
          </v-icon>
        </v-flex>
        <v-flex xs10>
          <v-card-title primary-title
                        style="cursor: pointer"
          >
            <a class="remove-anchor" :href="n.href">
              <div>
                <h5 class="title" style="margin-bottom: 12px;text-align: left">
                  {{n.title}}
                </h5>
                <div style="text-align: justify">{{ n.subtitle}}</div>
              </div>
            </a>
          </v-card-title>
          <v-card-actions>
            <v-icon class="mr-1">sentiment_satisfied_alt</v-icon>
            <span class="mr-3">{{n.totalClapCount.toLocaleString()}}</span>
            <v-icon class="mr-1">schedule</v-icon>
            <span class="mr-3">{{Math.round(n.readingTime)}}</span>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<script>

import {BOOKMARK} from '../store/action.types'

export default {
  name: 'Medium',
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    mediumBookmark (index, action, id) {
      this.$store
        .dispatch('home/' + BOOKMARK, {action, id, index, type: 'medium', data: this.list})
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
