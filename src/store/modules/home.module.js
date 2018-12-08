import APIService from '../../common/api.service'
import _ from 'lodash'

import {
  FETCH_DATA_GITHUB,
  FETCH_DATA_MEDIUM,
  BOOKMARK,
  GET_BOOKMARKS,
  GET_NOTES,
  UPDATE_NOTE,
  CREATE_NOTE,
  DELETE_NOTE
} from '../action.types'
import { getField, updateField } from 'vuex-map-fields'

const state = {
  infiniteId: new Date(),
  gitNext: 0,
  gitList: [],
  active: 'GITHUB',
  mediumNext: 0,
  mediumList: [],
  gitBookmarks: [],
  mediumBookmarks: [],
  notes: []
}

const getters = {
  getField,
  infiniteId (state) {
    return state.infiniteId + state.active
  },
  gitList (state) {
    return state.gitList
  },
  gitNext (state) {
    return state.gitNext
  },
  mediumList (state) {
    return state.mediumList
  },
  mediumNext (state) {
    return state.mediumNext
  },
  active (state) {
    return state.active
  },
  gitBookmarks (state) {
    return state.gitBookmarks
  },
  mediumBookmarks (state) {
    return state.mediumBookmarks
  },
  notes (state) {
    return state.notes
  }
}

const actions = {
  [FETCH_DATA_GITHUB] (context, $state) {
    return new Promise(resolve => {
      APIService.get(`github/top-stories/next/${context.getters.gitNext}`)
        .then(({ data }) => {
          if (data.docs.length) {
            context.commit('setGitNext', 50)
            let docs = null
            docs = data.docs.map(doc => ({
              ...doc,
              bookmark: false,
              href: `https://github.com/${doc.tags_url
                .split('/')
                .slice(4, -1)
                .join('/')}`
            }))
            context.commit('addGitdata', docs)
            $state.loaded()
          } else {
            $state.complete()
          }
          resolve(data)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  [BOOKMARK] (context, data) {
    return new Promise(resolve => {
      const {data: list, ...payload} = data
      APIService.put(`user/bookmark`, payload)
        .then(() => {
          list[payload.index].bookmark = !list[payload.index].bookmark
          context.commit('setGitData', list)
          resolve(data)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  [GET_BOOKMARKS] (context) {
    return new Promise((resolve, reject) => {
      APIService.get(`user/bookmark`)
        .then(({data}) => {
          const gitBookmarks = []
          const mediumBookmarks = []
          data.result.map(record => {
            const obj = {...record, bookmark: true}
            if (record.forks) gitBookmarks.push(obj)
            else mediumBookmarks.push(obj)
          })
          if (!(_.isEmpty(gitBookmarks))) {
            context.commit('setGitBookmarks', gitBookmarks)
          }
          if (!(_.isEmpty(mediumBookmarks))) {
            context.commit('setMediumBookmarks', mediumBookmarks)
          }
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  [GET_NOTES] (context) {
    return new Promise((resolve, reject) => {
      APIService.get(`user/note`)
        .then(({data}) => {
          context.commit('setNotes', data.notes)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  [CREATE_NOTE] (context, data) {
    return new Promise((resolve, reject) => {
      const {id, ...payload} = data
      APIService.post(`user/note`, payload)
        .then(({data}) => {
          context.commit('updateNotes', {...data, action: 'create'})
          resolve(data.data.id)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  [UPDATE_NOTE] (context, data) {
    return new Promise((resolve, reject) => {
      APIService.put(`user/note`, data)
        .then(({response}) => {
          context.commit('updateNotes', {data, action: 'update'})
          resolve(true)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  [DELETE_NOTE] (context, data) {
    return new Promise((resolve, reject) => {
      APIService.delete(`user/note/${data.id}`)
        .then(({resonse}) => {
          context.commit('updateNotes', {data, action: 'delete'})
          resolve(true)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  [FETCH_DATA_MEDIUM] (context, $state) {
    return new Promise(resolve => {
      APIService.get(`medium/top-stories/next/${context.getters.mediumNext}`)
        .then(({ data }) => {
          if (data.docs.length) {
            context.commit('setMediumNext', 50)
            let docs = null
            docs = data.docs.map(doc => ({
              ...doc,
              bookmark: false
            }))
            context.commit('addMediumData', docs)
            $state.loaded()
          } else {
            $state.complete()
          }
          resolve(data)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }
}

const mutations = {
  updateField,
  addGitdata (state, payload) {
    state.gitList = state.gitList.concat(payload)
  },
  setGitNext (state, count) {
    state.gitNext = state.gitNext + count
  },
  setGitData (state, data) {
    state.gitList = data
  },
  addMediumData (state, payload) {
    state.mediumList = state.mediumList.concat(payload)
  },
  setMediumNext (state, count) {
    state.mediumNext = state.mediumNext + count
  },
  setMediumData (state, data) {
    state.mediumList = data
  },
  setActive (state, event) {
    state.active = event.target.innerText
  },
  setGitBookmarks (state, data) {
    state.gitBookmarks = data
  },
  setMediumBookmarks (state, data) {
    state.mediumBookmarks = data
  },
  setNotes (state, notes) {
    state.notes = notes
  },
  updateNotes (state, payload) {
    const {action, data} = payload
    if (action === 'create') {
      state.notes.push(data)
    } else if (action === 'update') {
      state.notes = state.notes.map(note => {
        if (note.id === data.id) {
          return data
        }
        return note
      })
    } else {
      state.notes = state.notes.filter(note => note.id !== data.id)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
