/**
 * Created by ralphy on 20/05/17.
 */

/**
 * This file will load all controllers and return an object
 * indexing these controllers.
 */

const path = require('path');
const fs = require('fs');

/**
 * Return all the files inside the current directory
 * except index.js
 * this function is aimed at building a list of available controllers
 * @return {Array.<string>}
 */
function getControllers() {
    return fs.readdirSync(__dirname).filter(f => f !== 'index.js');
}

getControllers().forEach(
    m => module.exports[m.replace(/\.js$/, '')] = require(path.join(__dirname, m))
);
