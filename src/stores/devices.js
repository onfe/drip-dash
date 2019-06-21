const axios = require("axios");

const state = {
  devices: [],
  updated: -1,
  updating: false
};

const getters = {
  list: state => state.devices
};

const actions = {
  get: ({ state, dispatch }) => {
    // if last updated more than 1 minute ago, call an update, otherwise return.
    console.log(`Updated: ${state.updated}`)
    if (Date.now() - state.updated > 60 * 1000) {
      dispatch("update").then(() => {
        return state.devices;
      });
    } else {
      return new Promise(resolve => {
        resolve(state.devices);
      });
    }
  },
  update: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit("update");
      axios({ url: "api/devices/list", method: "GET" })
        .then(resp => {
          commit("updated", resp.data);
          resolve(resp.data);
          return resp.data;
        })
        .catch(err => {
          commit("error");
          reject(err);
        });
    });
  }
};

const mutations = {
  update: state => {
    state.updating = true;
  },
  updated: (state, devices) => {
    state.updating = false;
    state.devices = devices;
  },
  error: state => {
    state.updating = false;
  }
};

const devices = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

module.exports = devices;
