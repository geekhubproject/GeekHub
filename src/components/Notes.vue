<template>
  <div>
    <div class="adopt-sticky" style="position: absolute; width: 100%">
      <div v-if="editor">
        <v-btn fab dark fixed bottom right class="mb-3" @click="toggleEditor"
               color="indigo accent-2">
          <v-icon dark>list</v-icon>
        </v-btn>
        <div>
          <v-card style="width: 80%; margin: auto" class="elevation-0">
            <v-card-title primary-title>
              <div style="width: 100%">
                <input class="headline mb-3 text-xs-left editor-title" contenteditable="true" v-model="title"/>
                <div class="wi" ><froala :tag="'textarea'" :config="config" v-model="content"></froala></div>
              </div>
            </v-card-title>
            <v-card-actions class="right mb-4">
              <div class="text-xs-center">
                <v-btn round color="black indigo accent-2" class="mr-4" dark @click="saveNote">
                  <v-icon left class="mr-2">save</v-icon>
                  Save
                </v-btn>
              </div>
              <div class="text-xs-f">
                <v-btn @click="clearNote" round color="black indigo accent-2" class="mr-4" dark>
                  <v-icon left class="mr-2">delete_sweep</v-icon>
                  Clear
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </div>
      <v-container fluid grid-list-sm v-else>
        <v-btn fab dark fixed bottom right @click="toggleEditor"
               color="indigo accent-2">
          <v-icon dark>edit</v-icon>
        </v-btn>
        <v-layout row wrap>
          <v-flex v-for="note in notes" :key="note.id" xs6 md4 ld4 class="mx-0 my-2">
            <v-card>
              <v-card-title primary-title class="pa-0">
                <v-flex>
                  <v-toolbar color="indigo accent-2" dark>
                    <v-toolbar-title>{{note.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="deleteNote(note.id)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn icon @click="editNote(note.title, note.data, note.id)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-toolbar>
                </v-flex>
                <div class="pa-2" style="height: 100px; text-align: justify">
                  Listen to your favorite artists and albums whenever and wherever, online and offline.
                </div>
              </v-card-title>
              <v-card-actions class="pb-2 note-action">
                <v-spacer></v-spacer>
                <v-btn class="indigo accent-2" style="color: white" @click="dialog = true">
                  <v-icon left class="mr-2">share</v-icon>
                  Share
                </v-btn>
                <v-btn class="indigo accent-2" style="color: white" @click="togglePreview(note.title, note.data)">
                  <v-icon left class="mr-2">markunread</v-icon>
                  View
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-snackbar
      v-model="snackbar"
      color="indigo accent-2"
      :timeout="snackBarTimeout">
      {{ snackContent }}
      <v-btn
        dark
        flat
        @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <div v-if="preview">
      <NotePreview :data="previewData" :title="previewTitle" @closePreview="togglePreview"/>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import NotePreview from './NotePreview.vue'
import {UPDATE_NOTE, CREATE_NOTE, DELETE_NOTE} from '../store/action.types'
import { API_URL } from '@/common/config'

export default {
  name: 'Notes',
  components: {
    NotePreview
  },
  data () {
    return {
      config: {
        placeholder: 'Edit Me',
        editorClass: 'vue-editor',
        imageUploadURL: `${API_URL}user/image`,
        imageUploadParam: 'image',
        imageUploadParams: {
          name: 'image'
        }
      },
      content: null,
      title: 'Untitled',
      editor: false,
      editMode: false,
      id: null,
      snackBarTimeout: 2000,
      snackContent: '',
      snackbar: false,
      preview: false,
      previewTitle: null,
      previewData: null
    }
  },
  computed: {
    ...mapGetters('home', ['notes'])
  },
  methods: {
    toggleEditor () {
      this.editor = !this.editor
      this.editMode = false
      this.id = null
      this.title = 'Untitled'
      this.content = null
    },
    editNote (title, data, id) {
      this.content = data
      this.title = title
      this.editMode = true
      this.editor = true
      this.id = id
    },
    clearNote () {
      this.content = null
    },
    saveNote () {
      if (this.editMode) {
        this.$store
          .dispatch('home/' + UPDATE_NOTE, {title: this.title, data: this.content, id: this.id})
          .then(data => this.updateSnackBar('Note Updated'))
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$store
          .dispatch('home/' + CREATE_NOTE, {title: this.title, data: this.content, id: this.id})
          .then(id => {
            this.id = id
            this.editMode = true
            this.updateSnackBar('Note Created')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    deleteNote (id) {
      this.$store
        .dispatch('home/' + DELETE_NOTE, {id})
        .then(data => this.updateSnackBar('Note deleted'))
        .catch((err) => {
          console.log(err)
        })
    },
    updateSnackBar (text) {
      this.snackbar = true
      this.snackContent = text
    },
    togglePreview (title, data) {
      this.preview = !this.preview
      this.previewTitle = title
      this.previewData = data
    }
  }
}
</script>
<style>
  .editor-title {
    display: block;
    width: 100%;
  }
  .fr-box {
    z-index: 0;
  }
  a[href="https://froala.com/wysiwyg-editor"], a[href="https://www.froala.com/wysiwyg-editor?k=u"] {
    display: none !important;
    position: absolute;
    top: -99999999px;
  }
</style>
