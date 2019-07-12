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
  getData: (state) => (field, interval, from, to) => {
    var out = []
    interval = interval || 0;
    var lastTimestamp = 0;
    console.log(interval);
    state.data.forEach(val => {
      // either from is not enabled or the val.timestamp > from
      console.log(lastTimestamp + interval)
      console.log(val.timestamp)
      if (
        (!from || val.timestamp >= from) &&
        (!to || val.timestamp <= to) &&
        (lastTimestamp < val.timestamp)
      ) {
        out.push({timestamp: val.timestamp, field: val[field]});
        lastTimestamp = val.timestamp.setSeconds(val.timestamp.getSeconds() + interval);
      }
    });
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
