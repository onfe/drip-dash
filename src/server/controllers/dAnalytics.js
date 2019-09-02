module.exports = {
  status(device) {
    let rssi = device.rssi;
    let online = (Date.now() - Date.parse(device.online)) < 1000 * 10;
    if (online) {
      return rssi <= -75 ? "warn" : "ok";
    } else {
      return "offline";
    }
  },

  glances(device, data) {
    // if the device is offline, only show the connection status.
    let online = (Date.now() - Date.parse(device.online)) < 1000 * 10;
    if (!online) {
      return [ this.connection(device, data) ]
    }

    return [
      this.connection(device, data),
      this.temperature(device, data),
      this.bedLevels(device, data)
    ]
  },

  connection(device, data) {
    let rssi = device.rssi;
    let state = "unknown";
    let online = (Date.now() - Date.parse(device.online)) < 1000 * 10;
    if (online && rssi <= -75) {
      return {
        title: "Connection",
        state: "warn",
        text: "The Wi-Fi signal to the device is poor."
      }
    } else if (online) {
      return {
        title: "Connection",
        state: "ok",
        text: ""
      }
    } else {
      return {
        title: "Connection",
        state: "ko",
        text: "The device is powered off or disconnected."
      }
    }
  },

  temperature(device, data) {
    let latest = data[data.length-1]
    let waterTemp = latest.waterTemp;
    let airTemp = latest.airTemp;
    if (waterTemp < 0) {
      return {
        title: "Temperature",
        state: "warn",
        text: `The water temperature is very low (${waterTemp}°C)`
      }
    } else {
      return {
        title: "Temperature",
        state: "ok",
        text: ""
      }
    }
  },

  bedLevels(device, data) {
    let latest = data[data.length-1]
    let beds = latest.beds;
    let disconnected = false;
    beds.forEach(bed => {
      disconnected = (bed.level == 0) || disconnected;
    });
    if (disconnected) {
      return {
        title: "Water Level",
        state: "warn",
        text: "One of the water level sensors may be disconnected."
      }
    } else {
      return {
        title: "Water Level",
        state: "ok",
        text: ""
      }
    }
  }
}
