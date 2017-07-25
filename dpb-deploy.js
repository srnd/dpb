const fs = require('fs'),
      path = require('path'),
      colors = require('colors'),
      dpblib = require('./lib/dpblib'),
      program = require('commander')

var config = dpblib.getConfig()

if(!config) {
  console.log("Please run `dpb login` before deploying anything.".yellow)
  process.exit(1)
}

program
  .name("dpb deploy")
  .description("Deploy to a DeployBot environment.")
  .option("-m, --message [message]", "Set a custom deploy message (default: \"Deployment triggered from dpb\")")
  .parse(process.argv)

const DeployBot = require('./lib/deploybot'),
      deploybot = new DeployBot(config.subdomain, config.apiKey)

if(fs.existsSync(path.join(process.cwd(), ".dpb"))) {
  var envConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), ".dpb")))

  console.log("Deploying...".yellow)
  
  deploybot.deploy(envConfig.environmentId, config.userId, program.message)
    .catch(err => {
      console.log(`Error deploying environment:`.red, err)
    })
    .then(deployment => {
      // console.log(deployment)
      console.log(`Initiated deployment of commit ${deployment.deployed_version.substr(0, 7)}.`.green)
    })
} else {
  console.log("No dpb config found in current directory!".yellow)
  console.log("To create one, use `dpb init`")
}