const axios = require("axios");

const state = {
  progName: "",
  name: "",
  data: [],
  glances: [],
  type: -1,
  updated: -1,
  updating: false
};

const getters = {
  getData: state => (field, interval, from, to) => {
    var out = [];
    interval = interval || 0;
    var avTotal = 0;
    var avCount = 0;
    try {
      var nextTimestamp = state.data[0].timestamp;
    } catch {
      return [];
    }

    state.data.forEach(val => {
      // either from is not enabled or the val.timestamp > from
      avTotal += window._dripdash.$utils.accessValue(val, field);
      avCount += 1;
      if (
        (!from || val.timestamp >= from) &&
        (!to || val.timestamp <= to) &&
        nextTimestamp <= val.timestamp
      ) {
        out.push({ timestamp: val.timestamp, field: avTotal / avCount });
        avCount = 0;
        avTotal = 0;
        nextTimestamp = new Date(val.timestamp.getTime() + interval * 1000);
      }
    });
    if (!to) {
      var last = state.data[state.data.length - 1];
      out.push({
        timestamp: last.timestamp,
        field: window._dripdash.$utils.accessValue(last, field)
      });
    }
    return out;
  },

  getLatest: state => field => {
    if (!state.data[state.data.length - 1]) {
      return {
        timestamp: Date.now(),
        field: "-"
      };
    }
    return {
      timestamp: state.data[state.data.length - 1].timestamp,
      field: state.data[state.data.length - 1][field]
    };
  }
};

const actions = {
  set: ({ commit, dispatch }, id) => {
    commit("set", id);
    dispatch("update");
  },
  update: ({ state, commit }) => {
    return new Promise((resolve, reject) => {
      commit("updateDevice");
      axios({ url: `/api/devices/${state.progName}`, method: "GET" })
        .then(resp => {
          commit("updatedDevice", resp.data.device);
          commit("updateData");
          resp.data.data.forEach(v => {v.timestamp = new Date(v.timestamp);})
          commit("updatedData", resp.data.data);
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
    state.name = data.name;
    state.type = data.type;
    state.updating = false;
    state.updated = new Date();
  },
  updateData: state => {
    state.updating = true;
  },
  updatedData: (state, data) => {
    state.updating = false;
    state.updated = new Date();
    state.data = data;
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

export default device;
