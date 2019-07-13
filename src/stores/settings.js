const state = {
  apiInterval: 5,
  uiInterval: 1
};

const getters = {
  apiIntervalms: state => state.apiInterval * 1000,
  uiIntervalms: state => state.uiInterval * 1000
};

const actions = {};

const mutations = {};

const settings = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

export default settings;
