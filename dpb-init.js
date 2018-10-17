const fs = require('fs'),
      path = require('path'),
      colors = require('colors'),
      dpblib = require('./lib/dpblib'),
      prompt = require('prompt')

prompt.message = ""
prompt.delimiter = ":"

var config = dpblib.getConfig()

if(!config) {
  console.log("Please run `dpb login`.".yellow)
  process.exit(1)
}

const DeployBot = require('./lib/deploybot'),
      deploybot = new DeployBot(config.subdomain, config.apiKey)

console.log("Getting repositories from DeployBot...\n")

var finalRepo
var finalEnv

deploybot.repositories()
  .catch(err => {
    console.log(`Error getting repositories: ${err}`.red)
  })
  .then(repositories => {
    console.log("Available repositories:")

    repositories.entries.forEach((repo, index) => {
      console.log(`${index}: ${repo.title}`)
    })

    return new Promise((resolve, reject) => {
      prompt.get([{
        name: "repository",
        type: "integer",
        description: "Choose a repository",
        conform: val => val <= repositories.entries.length - 1,
        required: true
      }], (err, res) => {
        resolve(repositories.entries[res.repository])
      })
    })
  })
  .then(repo => {
    finalRepo = repo
    console.log(`\nGetting environments for ${repo.title.green}...`)
    return deploybot.environments(repo.id)
  })
  .catch(err => {
    console.log(`Error getting environments: ${err}`.red)
  })
  .then(environments => {
    if(environments.entries.length === 1) {
      console.log("Only one environment exists for repo, using that one.")
      return new Promise(resolve => resolve(environments.entries[0]))
    } else {
      console.log("Available environments:")

      environments.entries.forEach((env, index) => {
        console.log(`${index}: ${env.name}`)
      })

      return new Promise((resolve, reject) => {
        prompt.get([{
          name: "environment",
          type: "integer",
          description: "Choose an environment",
          conform: val => val <= environments.entries.length - 1,
          required: true
        }], (err, res) => {
          resolve(environments.entries[res.environment])
        })
      })
    }
  })
  .then(env => {
    console.log(`\nGenerating dpb in current directory for repo ${finalRepo.title.green} with environment ${env.name.green}.`)

    try {
      fs.writeFileSync(path.join(process.cwd(), ".dpb"), JSON.stringify({
        environmentId: env.id,
        repositoryId: finalRepo.id
      }))

      console.log("Done! Now you can run `dpb deploy` in this directory to deploy to your selected environment.".green)
    } catch(e) {
      console.log("Something went wrong while generating the file.".red, e)
    }
  })
