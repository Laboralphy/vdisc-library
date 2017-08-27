/**
 * Created by ralphy on 25/08/17.
 */
const display = require('../helpers/display');
const path = require('path');
const CONFIG = require('../config');
const cfl = require('../helpers/cursed-file-list');
const VIDFILES_PATH = path.join(__dirname, '../', CONFIG.paths.videos);
let VIDFILES_LIST = null;
let AUTOCOMP_LIST = null;
let VIDFILES_INDEX = null;



async function indexVidFiles() {
	VIDFILES_INDEX = {};
	VIDFILES_LIST = await cfl.search(VIDFILES_PATH);
	// complete with identifier
	VIDFILES_LIST.forEach(function(v, i) {
		v.id = (i + 1).toString(36);
		VIDFILES_INDEX[v.id] = v;
	});
	AUTOCOMP_LIST = VIDFILES_LIST
		.map(v => v.file.split('.').shift().replace(/[^0-9a-z]+/gi, '-'))
		.filter((value, index, self) => self.indexOf(value) === index);
}

indexVidFiles().then(function() {
	display.print(VIDFILES_LIST.length + ' files have been indexed.');
});


/**
 * Search for files matching the given pattern
 * @returns {Array}
 */
function search(sPattern, bDigest) {
	console.log('searching', sPattern);
	bDigest = bDigest || false;
	sPattern = sPattern.replace(/[^a-z0-9]+/gi, '-');
	let r = new RegExp(sPattern, 'i');
	if (bDigest) {
		return AUTOCOMP_LIST.filter(function(v) {
			return !!v.match(r);
		});
	} else {
		return VIDFILES_LIST.filter(function(v) {
			return !!v.file.match(r);
		});
	}
}

/**
 * Return the full qualified file name
 * @param sFile
 * @returns {Promise.<void>}
 */
function getFullName(sFile) {
	let v = VIDFILES_LIST.find(v => v.file === sFile);
	if (v) {
		return path.join(VIDFILES_PATH, v.path, v.file);
	} else {
		throw new Error('video not found');
	}
}

/**
 * Returns all info about a given video id
 * @param id
 * @return {*}
 */
function getById(id) {
	if (id in VIDFILES_INDEX) {
		return VIDFILES_INDEX[id];
	} else {
		return {};
	}
}

module.exports = {
	search,
	getFullName,
	getById
};