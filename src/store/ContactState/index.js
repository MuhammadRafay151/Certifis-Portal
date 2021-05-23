import axios from "axios";
export default {
    namespaced: true,
    state: {
        Contacts: [],
        OrgContacts: []
    },
    mutations: {
        AddContact(state, value) {
            state.Contacts.push(value);
        },
        SetContacts(state, value) {
            state.Contacts = value;
        },
        AddOrgContact(state, value) {
            state.OrgContacts.push(value);
        },

    },
    actions: {

        LoadContacts({ commit, rootState }) {
            return new Promise((resolve, reject) => {
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.UserState.user.token}`,
                    },
                    url: "/contact/details",
                    method: "GET"
                }).then(response => {
                    commit("SetContacts", response.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })

            })
        },
        AddContact({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({
                    url: "/contact",
                    method: "POST",
                    data: data
                }).then(response => {
                    commit("AddContact", response.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })

            })
        },
        AddOrgContact({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({
                    url: "/orgcontact",
                    method: "POST",
                    data: data
                }).then(response => {
                    commit("AddOrgContact", response.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })

            })
        },
        GetOrgContacts({ commit,rootState }) {
            return new Promise((resolve, reject) => {
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.UserState.user.token}`,
                    },
                    url: "/orgcontact",
                    method: "GET"
                }).then(response => {
                    commit("SetContacts", response.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })

            })
        },

    },
    getters: {}
}