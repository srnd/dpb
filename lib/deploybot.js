const request = require('request')

class DeployBot {
  constructor(subdomain, apiKey) {
    this.subdomain = subdomain
    this.apiKey = apiKey

    this.API_BASE = `https://${subdomain}.deploybot.com/api/v1/`
  }

  _get(endpoint, qs = { }) {
    var self = this

    return new Promise((resolve, reject) => {
      request(`${self.API_BASE}${endpoint}`, {
        headers: {
          "X-Api-Token": self.apiKey
        },
        json: true,
        qs
      }, (err, res, body) => {
        if(err) reject(err)
        if(!err) resolve(body)
      })
    })
  }

  _post(endpoint, body, qs = { }) {
    var self = this

    return new Promise((resolve, reject) => {
      request.post(`${self.API_BASE}${endpoint}`, {
        headers: {
          "X-Api-Token": self.apiKey
        },
        json: true,
        qs, body
      }, (err, res, bodyRes) => {
        if(res.statusCode !== 200) reject(bodyRes.message)
        if(res.statusCode === 200) resolve(bodyRes)
      })
    })
  }

  deploy(environment_id, user_id, comment = "Deployment triggered from dpb") {
    return this._post("deployments", { environment_id, user_id, comment })
  }

  repositories() {
    return this._get("repositories")
  }

  environments(repository_id) {
    return this._get("environments", { repository_id })
  }

  users() {
    return this._get("users")
  }
}

module.exports = DeployBot