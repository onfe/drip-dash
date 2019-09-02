const axios = require("axios");

const state = {
  list: [],
  updated: -1,
  updating: false
};

const getters = {};

const actions = {
  update: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit("update");
      axios({ url: "/api/devices/", method: "GET" })
        .then(resp => {
          resp.data.forEach(device => {
            device.name = device.name || device.progName;
            device.online = new Date(device.online);
            device.onlineNow = Date.now() - device.online < 10 * 1000;
          });
          commit("updated", resp.data);
          resolve(resp.data);
          return resp.data;
        })
        .catch(err => {
          commit("error");
          reject(err);
        });
    });
  },
  rename: ({ dispatch }, { id, name }) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/devices/${id}/rename`,
        data: { name },
        method: "POST"
      })
        .then(resp => {
          dispatch("update");
          resolve(resp);
        })
        .catch(err => {
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
    state.list = devices;
    state.updated = new Date();
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

export default devices;
