module.exports = {
  get(device, data) {
    return [
      this.connection(device, data),
      this.temperature(device, data),
      this.bedLevels(device, data),
    ]
  },

  connection(device, data) {
    return {};
  },

  temperature(device, data) {
    return {};
  },

  bedLevels(device, data) {
    return {};
  }
}
