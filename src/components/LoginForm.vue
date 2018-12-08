<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="username" prepend-icon="person" label="Username" type="text"></v-text-field>
                    <v-text-field v-model="password" prepend-icon="lock" label="Password" id="password" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" v-on:click.native="onSubmit(username,password)">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import { mapFields } from 'vuex-map-fields'
import { LOGIN } from '@/store/action.types'

export default {
  name: 'LoginForm',
  computed: {
    ...mapFields(`login`, [
      'user.username',
      'user.password'
    ])
  },
  methods: {
    onSubmit (username, password) {
      this.$store
        .dispatch('login/' + LOGIN, { username, password })
        .then(() => this.$router.push('/home'))
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
