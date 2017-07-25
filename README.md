# dpb

`dpb`: a command line tool to make DeployBot deployments easier.

![](https://i.imgur.com/bsIdBp9.gif)

## Getting Started

First, to install:

`[sudo] npm install -g dpb`

Then you're going to need to sign into DeployBot. Do this using:

`dpb login`

You will be prompted for your API key (found at `https://[your_subdomain].deploybot.com/api_keys`)
and your DeployBot subdomain.

After you're done logging in, you can run `dpb init` in any project
directory to make a `.dpb` file inside of that directory telling
`dpb` what environment to deploy to. After you've done this, deploying
is as simple as `dpb deploy`.

## Usage

```
  Usage: dbp [options] [command]

  A command-line tool for easy deployment to DeployBot.


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    deploy [options]  Deploy an environment using a .dpb file
    status            Get the status of the last deployment
    init              Generate a .dpb file in the current working directory
    login             Set your DeployBot domain and API key
    help [cmd]        display help for [cmd]
```