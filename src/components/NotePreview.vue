<template>
  <v-app>
    <v-layout row justify-center >
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar color="indigo accent-2" lights-out>
            <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat icon @click="closePreview">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div style="background-color: #F0F0F0; min-height: 100vh" class="pt-4 pb-5">
            <v-flex xs12 sm8 md8 offset-sm2 offset-md2>
              <v-card class="elevation-7 note-preview">
                <froalaView v-model="data"></froalaView>
              </v-card>
            </v-flex>
          </div>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: 'NotePreview',
  props: {
    data: {
      type: String
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      dialog: true
    }
  },
  methods: {
    closePreview () {
      this.dialog = false
      this.$emit('closePreview')
    }
  }
}
</script>

<style scoped>
.note-preview {
  min-height: 100vh;
  padding: 32px;
  position: sticky !important;
  top: 0 !important;
  z-index: 1;
}
</style>
