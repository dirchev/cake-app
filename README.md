# Cake App

## Description

This is a simple SPA for cakes! It is an application, where people can post pictures of their cakes along with name, comment and yum factor and share it with others. The application is build using ReactJS.

## Requirements

In order to develop/run this project, you will need. [NodeJS](https://nodejs.org) version `v8.9.1`. [nvm](https://github.com/creationix/nvm) can be used in order to install node and npm.

## How to Install

For the installation of the project follow these steps:

1. Clone the repository locally

```bash
git clone https://github.com/dirchev/cake-app
```

2. Enter project directory

On Linux

```bash
cd aileron cake-app
```

3. Install dependencies

```bash
npm install
```

4. You are good to go!

## Dev Commands

There are various commands, that help developing the application.

### Start dev env

```
npm start
```

Runs a simple server, serving the needed files to `localhost:3000`. It also watches for changes in all required `js` and `scss` files and in case of change refreshes the app.

### Build

In order to build production ready bundles:

For js bundle

```
npm run build-js
```

For css bundle

```
npm run build-css
```

For both

```
npm run build
```

## Test

There are no tests implemented atm, but in case test env has to be used, run:

```
npm run test
```

This executes [jest](https://facebook.github.io/jest/en/) CLI, which watches for test files and runs tests when a file changes. (it also has different functionality to run all tests, only failed, etc.)

## Deploy

There is really no deploy script, as a heroku is set up to deploy the application on push to `master`. However, in order to deploy this application somewhere else, all is needed to do is

```
npm run build # builds a full set of files in the /build dir
```

and then all of the files have to be served by a server, where if a file does not exists, the `index.html` file must be returned (this way the routing of the SPA is handled properly).
