import axios from "axios";
export default {
    namespaced: true,
    state: {
        Contacts: []
    },
    mutations: {
        AddContact(state, value) {
            state.Contacts.push(value);
        },
        SetContacts(state, value) {
            state.Contacts = value;
        },
      
    },
    actions: {
        
        LoadContacts({ commit }) {
            return new Promise((resolve, reject) => {
                axios({
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
       
    },
    getters: {}
}