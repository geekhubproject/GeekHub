import APIService from '../../common/api.service'
import JwtService from '../../common/jwt.service'
import {
  LOGIN,
  PURGE_AUTH
//   REGISTER,
//   CHECK_AUTH,
//   UPDATE_USER
} from '../action.types'
import { SET_AUTH, SET_ERROR } from '../mutation.types'
import {getField, updateField} from 'vuex-map-fields'

const state = {
  errors: null,
  user: {
    username: '',
    password: ''
  },
  isAuthenticated: !!JwtService.getToken()
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  },
  getField
}

const actions = {
  [LOGIN] (context, credentials) {
    return new Promise(resolve => {
      APIService.post('user/login', credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    })
  }
//   [LOGOUT](context) {
//     context.commit(PURGE_AUTH);
//   },
//   [REGISTER](context, credentials) {
//     return new Promise((resolve, reject) => {
//       ApiService.post("users", { user: credentials })
//         .then(({ data }) => {
//           context.commit(SET_AUTH, data.user);
//           resolve(data);
//         })
//         .catch(({ response }) => {
//           context.commit(SET_ERROR, response.data.errors);
//           reject(response);
//         });
//     });
//   },
//   [CHECK_AUTH](context) {
//     if (JwtService.getToken()) {
//       ApiService.setHeader();
//       ApiService.get("user")
//         .then(({ data }) => {
//           context.commit(SET_AUTH, data.user);
//         })
//         .catch(({ response }) => {
//           context.commit(SET_ERROR, response.data.errors);
//         });
//     } else {
//       context.commit(PURGE_AUTH);
//     }
//   },
//   [UPDATE_USER](context, payload) {
//     const { email, username, password, image, bio } = payload;
//     const user = {
//       email,
//       username,
//       bio,
//       image
//     };
//     if (password) {
//       user.password = password;
//     }

//     return ApiService.put("user", user).then(({ data }) => {
//       context.commit(SET_AUTH, data.user);
//       return data;
//     });
//   }
}

const mutations = {
  updateField,
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_AUTH] (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
