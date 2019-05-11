<template>
    <div>
        <v-toolbar color="indigo accent-2" dark tabs class="sticky">
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>GeekHub</v-toolbar-title>
            <v-text-field
                append-icon="mic"
                class="mt-3 mx-3"
                flat
                browser-autocomplete="true"
                prepend-inner-icon="search"
                solo-inverted
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat v-if='isAuthenticated'>
                    <router-link to="/" exact>Logout</router-link>
                </v-btn>
                <v-btn flat v-if='!isAuthenticated'>
                    <router-link to="/" exact>Login</router-link>
                </v-btn>
            </v-toolbar-items>
            <v-tabs
                v-if='isAuthenticated'
                slot="extension"
                grow
                color="transparent"
                slider-color="white">
                    <v-tab @click="handleTabChange($event)"
                        v-for="item in tabs"
                        :key="item">
                        {{item}}
                    </v-tab>
                </v-tabs>
                <v-tabs
                    v-else
                    slot="extension"
                    grow
                    color="transparent"
                    slider-color="white">
                    <v-tab
                        v-for="item in ['GITHUB', 'MEDIUM']"
                        :key="item">
                        {{item}}
                    </v-tab>
                </v-tabs>
        </v-toolbar>
        <slot name='tabitems'></slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {GET_BOOKMARKS, GET_NOTES} from '../store/action.types';

export default {
  name: 'Toolbar',
  props: {
    tabs: {
      type: Array
    }
  },
  computed: {
    ...mapGetters('login', ['currentUser', 'isAuthenticated'])
  },
  methods: {
    handleTabChange (event) {
      this.$store.commit('home/setActive', event);
      if (event.target.innerText === 'BOOKMARKS') {
        this.$store
          .dispatch('home/' + GET_BOOKMARKS)
          .catch((err) => {
            console.log(err);
          });
      }
      if (event.target.innerText === 'NOTES') {
        this.$store
          .dispatch('home/' + GET_NOTES)
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
