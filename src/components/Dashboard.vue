<template style="font-family: 'Roboto', sans-serif">
    <div>
        <v-toolbar
                color="indigo accent-2"
                dark
                tabs
        >
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

            <v-tabs
                    slot="extension"
                    grow
                    color="transparent"
                    slider-color="white"
            >
                <v-tab
                        v-for="n in ['GitHub', 'Medium', 'Notes', 'Bookmarks', 'Shared with Me']"
                        :key="n"
                        @click="changeType($event)"
                >
                    {{ n }}
                </v-tab>
            </v-tabs>
        </v-toolbar>

        <v-tabs-items>
            <v-tab-item v-if="active === 'GITHUB'">
                <v-card
                        flat
                        v-for="(n, index) in list"
                        :key="n._id"
                        class="my-3 mx-3"
                >
                        <v-layout row wrap>
                            <v-flex xs1 class="ml-1 mt-4 pt-1 text-md-center" >
                                <v-icon v-if="n.bookmark" style="cursor: pointer;color: #536DFE" @click="toggle(index)">star</v-icon>
                                <v-icon v-else style="cursor: pointer" @click="toggle(index)">star_border</v-icon>
                            </v-flex>
                            <v-flex xs10>
                                <v-card-title primary-title
                                              style="cursor: pointer"
                                >
                                    <a class="remove-anchor" :href="n.href">
                                        <div>
                                            <h5 class="title">{{n.title}}</h5>
                                            <div>{{ n.description}}</div>
                                        </div>
                                    </a>
                                </v-card-title>
                                <v-card-actions>
                                    <v-icon class="mr-1">stars</v-icon>
                                    <span class="mr-3">{{n.stars.toLocaleString()}}</span>
                                    <v-icon class="mr-1 rotate-icon">device_hub</v-icon>
                                    <span class="mr-3">{{n.forks.toLocaleString()}}</span>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                </v-card>
                <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
            </v-tab-item>
            <v-tab-item v-if="active === 'NOTES'">
                    <v-card-title primary-title >
                        <div style="width: 100%">
                            <h3 class="headline mb-3 text-xs-left editor-title" contenteditable="true">Untitled</h3>
                            <div class="wi"><froala :tag="'textarea'" :config="config" v-model="model"></froala></div>
                        </div>
                    </v-card-title>
                    <v-card-actions class="right mb-4">
                        <div class="text-xs-center">
                            <v-btn round color="black indigo accent-2" class="mr-4" dark>
                                <v-icon left class="mr-2">save</v-icon>
                                Save
                            </v-btn>
                        </div>
                        <div class="text-xs-center">
                            <v-btn round color="black indigo accent-2" class="mr-4" dark>
                                <v-icon left class="mr-2">delete_sweep</v-icon>
                                Cancel
                            </v-btn>
                        </div>
                    </v-card-actions>
            </v-tab-item>
            <v-tab-item v-if="active === 'BOOKMARKS'">
                <v-container fluid grid-list-sm>
                    <v-layout row wrap>
                        <v-flex v-for="i in 4" :key="i" xs6 md4 ld4 class="mx-0 my-2">
                            <v-card>
                                <v-card-title primary-title class="pa-0">
                                    <v-flex>
                                    <v-toolbar color="indigo accent-2" dark>
                                        <v-toolbar-title>Untitled</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn icon>
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                    </v-flex>
                                    <div class="pa-2" style="min-height: 100px">Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
                                </v-card-title>
                                <v-card-actions class="pb-2 note-action">
                                    <v-spacer></v-spacer>
                                    <v-btn class="indigo accent-2" style="color: white" @click="dialog = true">
                                        <v-icon left class="mr-2">share</v-icon>
                                        Share
                                    </v-btn>
                                    <v-btn class="indigo accent-2" style="color: white">
                                        <v-icon left class="mr-2">markunread</v-icon>
                                        View
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-tab-item>
        </v-tabs-items>
        <v-dialog
                v-model="dialog"
        >
            <v-container fluid grid-list-md>
            <v-layout row wrap align-cente>
                <v-flex md6 offset-md3 xs11 sm11>
                <v-card>
                    <v-card-title class="headline ma-0 pb-0 px-0">
                        <v-text-field
                                append-icon="mic"
                                class="px-3 pa-0 ma-0"
                                flat
                                prepend-inner-icon="search"
                                solo
                        ></v-text-field>
                    </v-card-title>

                    <v-list class="px-4">
                    <v-list v-for="item in [{name:'Ajith', id:1}, {name:'Appu', id:2}]"
                            :key="item.title"
                            style="border-bottom: 1px solid lightgrey">
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon>account_circle</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-checkbox input-value="true"></v-checkbox>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    </v-list>
                    <v-card-actions class="pa-3">
                        <v-spacer></v-spacer>

                        <v-btn
                                color="blue darken-1"
                                flat="flat"
                                @click="dialog = false"
                        >
                            <v-icon class="mr-2">share</v-icon>
                            Share
                        </v-btn>

                        <v-btn
                                color="blue darken-1"
                                flat="flat"
                                @click="dialog = false"
                        >
                            <v-icon class="mr-2">cancel</v-icon>
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>
            </v-layout>
            </v-container>
        </v-dialog>
    </div>
</template>

<script>
import axios from "axios";
const gitApi = "https://geekhub-node.herokuapp.com/github/top-stories/next";
const mediumApi = "https://geekhub-node.herokuapp.com/medium/top-stories/next";
import InfiniteLoading from "vue-infinite-loading";
import VueFroala from "vue-froala-wysiwyg";

export default {
  name: "Dashboard",
  data() {
    return {
      page: 0,
      dialog: false,
      list: [],
      active: "GITHUB",
      api: gitApi,
      infiniteId: +new Date(),
      config: {
        placeholder: "Edit Me",
        editorClass: "vue-editor",
        events: {
          "froalaEditor.focus": function(e, editor) {
            console.log(editor.selection.get());
          }
        }
      },
      model: null
    };
  },
  components: {
    InfiniteLoading
  },
  methods: {
    infiniteHandler($state) {
      axios.get(`${this.api}/${this.page}`).then(({ data }) => {
        if (data.docs.length) {
          this.page += 50;
          let docs = null;
          if (this.api === gitApi) {
            docs = data.docs.map(doc => ({
              ...doc,
              bookmark: false,
              href: `https://github.com/${doc.tags_url
                .split("/")
                .slice(4, -1)
                .join("/")}`
            }));
          } else {
            docs = data.docs;
          }
          this.list = this.list.concat(docs);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
      return this.list;
    },
    changeType(event) {
      let flag = false;
      if (event.target.innerText === "MEDIUM" && this.api !== mediumApi) {
        this.api = mediumApi;
        flag = true;
      } else if (event.target.innerText === "GITHUB" && this.api !== gitApi) {
        this.api = gitApi;
        flag = true;
      }
      if (flag) {
        this.page = 0;
        this.list = [];
        this.infiniteId += 1;
      }
      this.active = event.target.innerText;
    },
    toggle(index) {
      this.list[index].bookmark = !this.list[index].bookmark;
    }
  }
};
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
  min-height: calc(55vh);
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
</style>
