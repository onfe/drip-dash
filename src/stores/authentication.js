import router from "../router"

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
  request: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      // Set the state to loading whilst we get authenticated.
      commit("request");

      axios({ url: "/api/auth/request", data: user, method: "POST" })
        .then(resp => {
          // if the auth request succeeds, get the token, and store it.
          const token = resp.data.token;
          localStorage.setItem("user-token", token); // store the token in localstorage

          // set the token to be sent with every request.
          axios.defaults.headers.common["Authorization"] = token;

          commit("success", token);

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
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },

  prepareLogin: () => {
    return new Promise((resolve, reject) => {
      axios({ url: "/api/auth/reqres", method: "GET" })
        .then(resp => {
          if (resp.data) {
            // registration is required, redirect.
            router.push("/register");
          }
          resolve(resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  prepareRegister: () => {
    return new Promise((resolve, reject) => {
      axios({ url: "/api/auth/reqres", method: "GET" })
        .then(resp => {
          if (!resp.data) {
            // registration is NOT required, redirect.
            router.push("/");
          }
          resolve(resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  create: ({ commit, dispatch }, user) => {
    if (user.password != user.passwordConf) {
      commit("error");
      return;
    } else {
      return new Promise((resolve, reject) => {
        axios({ url: "/api/auth/create", data: user, method: "POST" })
          .then(resp => {
            // account created, complete log-in.
            dispatch("user/request", user);
            resolve(resp);
          })
          .catch(err => {
            commit("error", err);
            reject(err);
          });
      });
    }
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

export default authentication;
