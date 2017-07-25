const fs = require('fs'),
      path = require('path'),
      colors = require('colors'),
      dpblib = require('./lib/dpblib'),
      prompt = require('prompt')

const DeployBot = require('./lib/deploybot')

prompt.message = ""
prompt.delimiter = ":"
prompt.start()

prompt.get([
  {
    name: "apiKey",
    description: "Enter your DeployBot API key (can be found in Settings > Developer API)",
    required: true
  },
  {
    name: "subdomain",
    description: "Enter your DeployBot subdomain (e.g., the srnd in srnd.deploybot.com)",
    required: true
  }
], (err, res) => {
  console.log("Getting users list from DeployBot...".green)

  var deploybot = new DeployBot(res.subdomain, res.apiKey)

  deploybot.users()
    .catch(err => {
      console.log("Error getting users! Are you sure you have the right subdomain/key?".red)
    })
    .then(users => {
      console.log("\nUsers on account:")
      users.entries.forEach((user, index) => console.log(`${index}: ${user.first_name} ${user.last_name}`))

      return new Promise((resolve, reject) => {
        prompt.get([{
          name: "user",
          type: "integer",
          description: "Which user do you want to deploy as?",
          conform: val => val <= users.entries.length - 1,
          required: true
        }], (err, res) => {
          resolve(users.entries[res.user])
        })
      })
    })
    .then(user => {
      console.log("\nSaving config...".yellow)

      dpblib.setConfig({
        userId: user.id,
        apiKey: res.apiKey,
        subdomain: res.subdomain
      })

      console.log("Done! You can now run `dpb init` in a directory to get started.".green)
    })
})