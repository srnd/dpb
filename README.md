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