const axios = require("axios");

const state = {
  progName: "",
  name: "",
  data: {},
  type: -1,
  updated: -1,
  updating: false
};

const getters = {};

const actions = {
  set: ({ state, dispatch, commit }, id) => {
    if (id == state.progName) {
      return state;
    } else {
      commit("set", id);
      dispatch("update").then(() => {
        return state;
      });
    }
  },
  update: ({ state, commit }) => {
    return new Promise((resolve, reject) => {
      commit("update");
      axios({ url: `/api/devices/${state.progName}`, method: "GET" })
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
  set: (state, id) => {
    state.updating = true;
    state.progName = id;
    state.name = id;
    state.data = {};
    state.type = -1;
    state.updated = -1;
  },
  update: state => {
    state.updating = true;
  },
  // eslint-disable-next-line
  updated: (state, data) => {
    console.log(data);
    state.name = data.name;
    state.type = data.type;
    state.updating = false;
    state.updated = new Date();
  },
  error: state => {
    state.updating = false;
  }
};

const device = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

module.exports = device;
