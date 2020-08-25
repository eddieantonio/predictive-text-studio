Contributing
============

How the branches work
---------------------

> **TODO**: Eddie, write this!

How to submit a pull request
----------------------------

> **TODO**: Eddie, write this!


Setting up your development environment
---------------------------------------

### Install

You will need:

 1. [Node.JS 12+](https://nodejs.org/en/)
 2. [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

After cloning this repository, you can install the rest of the
dependencies using:

    yarn install

### Build

Run this to build all the files

    yarn run build

### Start the development environment

To start development, run the following:

    yarn run dev

This does a few things:

 1. Starts `rollup` in "watch mode"
 2. Does an initial build of all of the JavaScript
 3. Starts [LiveReload](http://livereload.com/) (you need to install the
    LiveReload extension for your browser for this to work).

Once the first build has finished, you will be able to see the website
at <http://localhost:5000/>.

### Run the end-to-end tests interactively

With the server running as above (with `yarn start`), run this to open
[Cypress](https://www.cypress.io/):

    yarn run cy

