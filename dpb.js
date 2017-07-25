#!/usr/bin/env node

const program = require('commander'),
      package = require('./package.json')

program
  .version(package.version)
  .name("dbp")
  .description("A command-line tool for easy deployment to DeployBot.")
  .command("deploy [options]", "Deploy an environment using a .dpb file")
  .command("status", "Get the status of the last deployment")
  .command("init", "Generate a .dpb file in the current working directory")
  .command("login", "Set your DeployBot domain and API key")
  .parse(process.argv)