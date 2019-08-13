import router from "../router";

const axios = require("axios");

const state = {
  token: localStorage.getItem("user-token") || "",
  expires: localStorage.getItem("user-token-expires") || "",
  status: "",
  refreshTimeout: ""
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

      axios({ url: "/api/auth/request", data: user, method: "POST" })
        .then(resp => {
          // if the auth request succeeds, get the token, and store it.
          const token = resp.data.token;
          const expires = new Date(resp.data.expires);
          console.log(expires);
          localStorage.setItem("user-token", token); // store the token in localstorage
          localStorage.setItem("user-token-expires", expires);

          commit("success", { token, expires });

          var tillRefresh = expires.getTime() - Date.now() - 30000;
          console.log(tillRefresh);
          var timeout = setTimeout(function() { dispatch("refresh") }, tillRefresh)

          commit("nextRefresh", timeout);

          resolve(resp);
        })
        .catch(err => {
          commit("error", err);
          localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
          reject(err);
        });
    });
  },
  // eslint-disable-next-line
  refresh: ({ commit, state, dispatch }) => {
    return new Promise((resolve, reject) => {
      // Set the state to refreshing.
      commit("refresh");

      var pl = { token: state.token };
      axios({ url: "/api/auth/refresh", data: pl, method: "POST" })
        .then(resp => {
          // if the auth request succeeds, get the token, and store it.
          const token = resp.data.token;
          const expires = new Date(resp.data.expires);
          console.log(expires);
          localStorage.setItem("user-token", token); // store the token in localstorage
          localStorage.setItem("user-token-expires", expires);

          commit("success", { token, expires });

          var tillRefresh = expires.getTime() - Date.now() - 30000;
          console.log(tillRefresh);
          var timeout = setTimeout(function() { dispatch("refresh") }, tillRefresh)

          commit("nextRefresh", timeout);

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
    clearTimeout(state.refreshTimeout);
    state.status = "loading";
  },
  success: (state, { token, expires }) => {
    state.status = "success";
    state.token = token;
    state.expires = expires;
    // set the token to be sent with every request.
    axios.defaults.headers.common["Authorization"] = token;
  },
  error: state => {
    state.status = "error";
  },
  logout: state => {
    state.token = "";
  },
  refresh: state => {
    clearTimeout(state.refreshTimeout);
    state.status = "refreshing"
  },
  nextRefresh: (state, timeout) => {
    state.refreshTimeout = timeout;
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
