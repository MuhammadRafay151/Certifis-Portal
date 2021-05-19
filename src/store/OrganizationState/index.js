import axios from "axios";
export default {
    namespaced: true,
    state: {
        Organizations: []
    },
    mutations: {
        SetOrgs(state, value) {
            state.Organizations = value;
        },
        AddOrg(state, value) {
            state.Organizations.push(value);
        },
        DeleteOrg(state, id) {
            state.Organizations = state.Organizations.filter(x => x._id != id);
        },

    },
    actions: {

        GetOrgs({ commit }) {
            return new Promise((resolve, reject) => {
                axios({
                    url: "/organization",
                    method: "GET"
                }).then(res => {
                    commit("SetOrgs", res.data);
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddOrg({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    url: "/organization",
                    method: "POST",
                    data: data,
                }).then(res => {
                    commit("AddOrg", res.data);
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteOrg({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios({
                    url: "/organization/" + id,
                    method: "DELETE",
                }).then(() => {
                    commit("DeleteOrg", id)
                    resolve()
                }).catch(err => {
                    reject(err)
                })

            })
        },
        UpdateOrg(ctx, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    url: "/organization/" + data._id,
                    method: "PUT",
                    data: data,
                }).then(() => {

                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },

    },
    getters: {}
}