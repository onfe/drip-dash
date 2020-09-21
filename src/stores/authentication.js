import router from "../router";
import { apolloClient } from "../plugins/apollo";
import gql from "graphql-tag";
import jwt from "jsonwebtoken";

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  refreshTimeout: ""
};

const getters = {
  isAuthenticated: state => !!state.token
};

const actions = {
  // Request an auth token
  request: ({ commit }, user) => {
    return new Promise((res, rej) => {
      // Set the state to authenticated whilst we wait for a response.
      commit("loading");

      apolloClient
        .mutate({
          mutation: gql`
            mutation($username: String!, $password: String!) {
              login(username: $username, password: $password)
            }
          `,

          variables: {
            username: user.username,
            password: user.password
          }
        })
        .then(pl => {
          const token = pl.data.login;
          if (!token) {
            localStorage.removeItem("user-token");
            return rej("Invalid credentials.");
          }

          // Note: decoding does not verify the content signature.
          // As we trust the server, we do not need to verify the sig.
          const body = jwt.decode(token);

          // Schedule a token refresh for 30s before expiry
          // const tillRefresh = new Date(body.exp * 1000) - Date.now() - 30000;
          // const refreshTimeout = setTimeout(() => {
          //   // TODO: add refresh
          // }, tillRefresh);

          // Save the auth token, and log in!
          commit("login", token);

          router.push({ path: "/" });
          res(body.id);
        });
    });
  },
  // eslint-disable-next-line
  // refresh: ({ commit, state, dispatch }) => {
  //   return new Promise((resolve, reject) => {
  //     // Set the state to refreshing.
  //     commit("refresh");

  //     var pl = { token: state.token };
  //     axios({ url: "/api/auth/refresh", data: pl, method: "POST" })
  //       .then(resp => {
  //         // if the auth request succeeds, get the token, and store it.
  //         const token = resp.data.token;
  //         const expires = new Date(resp.data.expires);
  //         localStorage.setItem("user-token", token); // store the token in localstorage
  //         localStorage.setItem("user-token-expires", expires);

  //         commit("success", { token, expires });

  //         var tillRefresh = expires.getTime() - Date.now() - 30000;
  //         var timeout = setTimeout(function() {
  //           dispatch("refresh");
  //         }, tillRefresh);

  //         commit("nextRefresh", timeout);

  //         resolve(resp);
  //       })
  //       .catch(err => {
  //         commit("error", err);
  //         localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
  //         reject(err);
  //       });
  //   });
  // },

  logout: ({ commit }) => {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("user-token"); // clear your user's token from localstorage
      // dispatch("device/reset", {}, { root: true });
      // dispatch("nav/setBc", [], { root: true });
      resolve();
    });
  }

  // register: ({ commit, dispatch }, user) => {
  //   if (user.password != user.passwordConf) {
  //     commit("error");
  //     return;
  //   } else {
  //     return new Promise((resolve, reject) => {
  //       axios({ url: "/api/auth/create", data: user, method: "POST" })
  //         .then(resp => {
  //           // account created, complete log-in.
  //           dispatch("user/request", user);
  //           resolve(resp);
  //         })
  //         .catch(err => {
  //           commit("error", err);
  //           reject(err);
  //         });
  //     });
  //   }
  // }
};

const mutations = {
  loading: state => {
    state.status = "loading";
    clearTimeout(state.refreshTimeout);
  },
  login: (state, token) => {
    state.status = "authenticated";
    state.token = token;
    localStorage.setItem("user-token", token);
  },
  error: state => {
    state.status = "error";
  },
  logout: state => {
    state.token = "";
  },
  refresh: state => {
    clearTimeout(state.refreshTimeout);
    state.status = "refreshing";
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
