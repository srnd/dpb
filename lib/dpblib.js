const fs = require('fs'),
      path = require('path')

var homeDir = process.platform === "win32" ? process.env["USERPROFILE"] : process.env["HOME"]

module.exports = {
  getConfig() {
    try {
      return JSON.parse(fs.readFileSync(path.join(homeDir, ".dpbrc")))
    } catch(err) {
      return false
    }
  },
  
  setConfig(config) {
    try {
      return fs.writeFileSync(path.join(homeDir, ".dpbrc"), JSON.stringify(config))
    } catch(err) {
      return false
    }
  }
}