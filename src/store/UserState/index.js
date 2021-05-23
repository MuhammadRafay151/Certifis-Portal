import axios from "axios"
export default {
  namespaced: true,
  state: {
    user: { token: null }
  },
  mutations: {
    signout(state) {
      state.user = { token: null }
      localStorage.removeItem("user")
    },
    signin(state, user) {

      // delete user.token
      state.user = user
      localStorage.setItem("user", JSON.stringify({ user: user }))
    },
    load_user(state) {
      var x = JSON.parse(localStorage.getItem("user"))
      if (x) {
        state.user = x.user
      }
    },
    UpdateAccessToken(state, token) {
      state.user.token = token
      localStorage.setItem("user", JSON.stringify({ user: state.user }))
    }
  },
  actions: {
    authenticate({ commit }, auth) {
      return new Promise((res, rej) => {
        axios({
          method: "post",
          data: { email: auth.email, password: auth.password },
          url: '/account/login'
        }).then(resposne => {
          commit("signin", resposne.data)
          res()

        }).catch(err => {
          rej(err)

        })
      })

    },
    signout({ state, commit }) {
      return new Promise((res, rej) => {
        axios({
          method: "post",
          data: { RefreshToken: state.user.RefreshToken },
          url: '/account/sign_out'
        }).then(() => {
          commit("signout")
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },

    RegisterUser({ rootState }, data) {

      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: "/account/register/",
          method: "POST",
          data: data
        }).then(() => {
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },








  },
  getters: {
    IsLoggedIn(state) {
      return state.user.token != null
    },


  }
}
