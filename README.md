# Scheduler Demo

[![Build Status](https://travis-ci.org/BaylorRae/scheduler.svg?branch=master)](https://travis-ci.org/BaylorRae/scheduler)

This is an example application built with Rails 5 and Angular 2. It is a clone of [Heroku's Scheduler] application.

### Development

**Requirements**

- Ruby 2.3
- Node 6.10

```bash
$ git clone https://github.com/BaylorRae/scheduler.git
$ cd scheduler
$ bundle install
$ cd client
$ npm install
$ rails db:seed
```

### Starting the project

Because this application depends on a Rails server and Angular-CLI it uses a development `Procfile` to start and manage both processes.

```bash
$ foreman start -f Procfile.dev
# starts rails and angular development servers
```

### Deploying to Heroku

Deploying to heroku requires a few changes to a standard Rails application. We need to tell Heroku to build our angular application with a custom buildpack and to also install `devDependencies`.

```bash
$ heroku config:set NPM_CONFIG_PRODUCTION=false
$ heroku buildpacks:add https://github.com/jasonswett/heroku-buildpack-nodejs
$ heroku buildpacks:add heroku/ruby
$ heroku buildpacks # confirm nodejs buildpack is loaded first
=== ng-scheduler Buildpack URLs
1. https://github.com/jasonswett/heroku-buildpack-nodejs
2. heroku/ruby
```

[Heroku's Scheduler]: https://devcenter.heroku.com/articles/scheduler
