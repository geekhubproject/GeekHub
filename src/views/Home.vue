<template>
    <div id="home">
        <app-toolbar :tabs="tabs" @click="$emit('handleTabChange', $event)">
            <v-tabs-items
                slot="tabitems">
                <v-tab-item v-if="active === 'GITHUB'">
                  <git-hub :list="gitList"/>
                <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
                </v-tab-item>
                <v-tab-item v-if="active === 'MEDIUM'">
                  <medium :list="mediumList"/>
                  <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
                </v-tab-item>
                <v-tab-item v-if="active === 'NOTES'">
                  <notes/>
                </v-tab-item>
                <v-tab-item v-if="active === 'BOOKMARKS'">
                  <git-hub :list="gitBookmarks"/>
                  <medium :list="mediumBookmarks"/>
                </v-tab-item>
            </v-tabs-items>
        </app-toolbar>
    </div>
</template>
<script>
import Toolbar from '@/components/Toolbar'
import Github from '@/components/Github'
import Medium from '@/components/Medium'
import Notes from '@/components/Notes'
import { mapGetters } from 'vuex'
import {FETCH_DATA_GITHUB, FETCH_DATA_MEDIUM} from '@/store/action.types'

export default {
  name: 'Home',
  components: {
    'app-toolbar': Toolbar,
    'git-hub': Github,
    'medium': Medium,
    'notes': Notes
  },
  data () {
    return {
      tabs: [
        'GITHUB',
        'MEDIUM',
        'NOTES',
        'BOOKMARKS',
        'SHARED WITH ME'
      ]
    }
  },
  computed: {
    ...mapGetters('home', ['infiniteId', 'gitList', 'mediumList', 'active',
      'gitBookmarks', 'mediumBookmarks'])
  },
  methods: {
    infiniteHandler ($state) {
      if (this.active === 'GITHUB') {
        this.$store
          .dispatch('home/' + FETCH_DATA_GITHUB, $state)
          .catch((err) => {
            console.log(err)
          })
      }
      if (this.active === 'MEDIUM') {
        this.$store
          .dispatch('home/' + FETCH_DATA_MEDIUM, $state)
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>
<style>
  .remove-anchor,
  .remove-anchor:link,
  .remove-anchor:visited,
  .remove-anchor:hover,
  .remove-anchor:focus,
  .remove-anchor:active {
    color: inherit;
    text-decoration: none;
  }
  .rotate-icon {
    transform: rotate(180deg);
  }
  .fr-toolbar {
    border-top: 5px solid #536dfe !important;
  }
  .fr-wrapper {
    min-height: calc(150vh);
  }
  .editor-title {
    outline: none !important;
  }
  .note-action {
    padding-bottom: 16px !important;
    padding-right: 16px !important;
  }
  .v-dialog {
    -webkit-box-shadow: unset;
    box-shadow: unset;
  }
  .wi .fr-element {
    text-align: justify;
  }
  .sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .adopt-sticky {
    z-index: 0
  }
  .fr-wrapper div:first-child {
    left: 9999999px;
    width: 100%;
    position: relative;
  }
</style>
