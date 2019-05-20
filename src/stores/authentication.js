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
  // Request an auth token
  request: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      // Set the state to loading whilst we get authenticated.
      commit("request");

      axios({ url: "api/auth/request", data: user, method: "POST" })
        .then(resp => {
          // if the auth request succeeds, get the token, and store it.
          const token = resp.data.token;
          localStorage.setItem("user-token", token); // store the token in localstorage
          console.log(token);
          // set the token to be sent with every request.
          axios.defaults.headers.common["Authorization"] = token;

          commit("success", token);

          // using the token, complete log-in
          // dispatch("user/request");
          resolve(resp);
          axios({ url: "api/auth/test", data: {test: "test"}, method: "GET" });
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
      delete axios.defaults.headers.common["Authorization"];
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
