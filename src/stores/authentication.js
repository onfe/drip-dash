const axios = require("axios");

const state = {
  token: localStorage.getItem("user-token") || "",
  status: ""
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  request: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      // The Promise used for router redirect in login
      commit("request");
      axios({ url: "api/auth/request", data: user, method: "POST" })
        .then(resp => {
          const token = resp.data.token;
          localStorage.setItem("user-token", token); // store the token in localstorage
          commit("success", token);
          // you have your token, now log in your user :)
          dispatch("user/request");
          resolve(resp);
        })
        .catch(err => {
          commit("error", err);
          localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
          reject(err);
        });
    });
  },

  logout: ({ commit }) => {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("user-token"); // clear your user's token from localstorage
      resolve();
    });
  }
};

const mutations = {
  request: state => {
    state.status = "loading";
  },
  success: (state, token) => {
    state.status = "success";
    state.token = token;
  },
  error: state => {
    state.status = "error";
  },
  logout: state => {
    state.token = "";
  }
};

const authentication = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

module.exports = authentication;
