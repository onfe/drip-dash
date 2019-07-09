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
  set: ({ state, commit }, id) => {
    if (id == state.progName) {
      return state;
    } else {
      commit("set", id);
      return new Promise((resolve, reject) => {
        commit("updateDevice");
        axios({ url: `/api/devices/${state.progName}`, method: "GET" })
          .then(resp => {
            commit("updatedDevice", resp.data);
            resolve(state);
            return state;
          })
          .catch(err => {
            commit("error");
            reject(err);
          });
      });
    }
  },
  update: ({ state, commit }, timeframe) => {
    if (!timeframe) {
      var timeframe = {};
      timeframe.from = Date.now() - 1000 * 60 * 20;
    }
    return new Promise((resolve, reject) => {
      commit("updateData");
      axios({
        url: `/api/devices/${state.progName}/data`,
        params: timeframe,
        method: "GET"
      })
        .then(resp => {
          commit("updatedData", resp.data);
          resolve(state);
          return state;
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
  updateDevice: state => {
    state.updating = true;
  },
  // eslint-disable-next-line
  updatedDevice: (state, data) => {
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
