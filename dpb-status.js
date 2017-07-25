const fs = require('fs'),
      path = require('path'),
      colors = require('colors'),
      dpblib = require('./lib/dpblib')

var config = dpblib.getConfig()

if(!config) {
  console.log("Please run `dpb login` before getting deployment status.".yellow)
  process.exit(1)
}

const DeployBot = require('./lib/deploybot'),
      deploybot = new DeployBot(config.subdomain, config.apiKey)

var stateColors = {
  pending: "yellow",
  waiting: "yellow",
  failed: "red",
  success: "green",
  skipped: "gray"
}

if(fs.existsSync(path.join(process.cwd(), ".dpb"))) {
  var envConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), ".dpb")))

  console.log("Getting latest deployment status...".yellow)

  deploybot.deployments(envConfig.environmentId, 1)
    .catch(err => {
      console.log(`Error getting latest deployment: ${err}`.red)
    })
    .then(deployments => {
      var deployment = deployments.entries[0]

      console.log("\nLatest deployment:")
      console.log(`  Initiated by ${deployment.author_name}`)
      console.log(`  Comment: ${deployment.comment}`)
      console.log(`  Commit: ${deployment.deployed_version.substr(0, 7)}`)
      console.log(`  Status: ${deployment.state[stateColors[deployment.state]]}`)
    })
} else {
  console.log("No dpb config found in current directory!".yellow)
  console.log("To create one, use `dpb init`")
}