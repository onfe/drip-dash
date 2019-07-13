const axios = require("axios");

const state = {
  progName: "",
  name: "",
  data: [],
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
    var nextTimestamp = state.data[0].timestamp;
    state.data.forEach(val => {
      // either from is not enabled or the val.timestamp > from
      if (
        (!from || val.timestamp >= from) &&
        (!to || val.timestamp <= to) &&
        nextTimestamp <= val.timestamp
      ) {
        avCount += 1;
        avTotal += val[field];
        out.push({ timestamp: val.timestamp, field: avTotal / avCount });
        avCount = 0;
        avTotal = 0;
        nextTimestamp = new Date(val.timestamp.getTime() + interval * 1000);
      } else {
        avTotal += val[field];
        avCount += 1;
      }
    });
    if (!to) {
      var last = state.data[state.data.length - 1];
      out.push({ timestamp: last.timestamp, field: last[field] });
    }
    return out;
  }
};

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
    return new Promise((resolve, reject) => {
      commit("updateData");
      axios({
        url: `/api/devices/${state.progName}/data`,
        params: timeframe,
        method: "GET"
      })
        .then(resp => {
          resp.data.forEach(v => {
            v.timestamp = new Date(v.timestamp);
          });
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
