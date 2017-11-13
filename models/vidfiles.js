/**
 * Created by ralphy on 25/08/17.
 */
const display = require('../helpers/display');
const fs = require('fs');
const path = require('path');
const CONFIG = require('../config');
const cfl = require('../helpers/cursed-file-list');
const VIDFILES_PATH = path.join(__dirname, '../', CONFIG.paths.videos);
const INDEX_FILENAME = 'index.json';

let VIDFILES_LIST = null;
let VIDFILES_INDEX = null;
let VIDFOLDER_DATA = null;
let AUTOCOMP_LIST = null;

function clear() {
	VIDFILES_LIST = null;
	AUTOCOMP_LIST = null;
	VIDFILES_INDEX = null;
	VIDFOLDER_DATA = null;
}

/**
 * Défines and indexes a list of video files
 * @param vfl list of video files
 *
 */
function setVidFiles(vfl) {
	let aFileIndex = {};
	let aFileList = vfl.slice(0);
	// complete with identifier
	aFileList.forEach(function(v, i) {
		if (v !== VIDFILES_INDEX) {
            v.id = (i + 1).toString(36);
            aFileIndex[v.id] = v;
        }
	});
	let aAutoCompList = aFileList
		.map(v => v.file.split('.').shift().replace(/[^0-9a-z]+/gi, '-'))
		.filter((value, index, self) => self.indexOf(value) === index);
	VIDFILES_LIST = aFileList;
	VIDFILES_INDEX = aFileIndex;
	AUTOCOMP_LIST = aAutoCompList;
}

/**
 * indexes all files present in the VIDFILES sub-directory
 * @returns {Promise.<void>}
 */
async function indexVidFiles() {
	setVidFiles(await cfl.search(VIDFILES_PATH));
}

async function loadFolderData(sPath) {
	return new Promise(function(resolve) {
		let sFile = path.join(VIDFILES_PATH, sPath, INDEX_FILENAME);
		fs.stat(sFile, function(err, stat) {
			if (stat) {
				fs.readFile(sFile, 'utf8', function(err, data) {
					if (err) {
						throw err;
					} else {
						resolve(JSON.parse(data));
					}
				});
			} else {
				resolve({});
			}
		});
	});
}

async function indexFolderData() {
	let aFolderList = await cfl.directoryList(VIDFILES_PATH);
	let oData = {};
    let idVideo = 0;
	for (let i = 0, l = aFolderList.length; i < l; ++i) {
		let f = aFolderList[i];
		let d = await loadFolderData(f);
		if (!('name' in d)) {
			d.name = f;
		}
		d.id = (i + 1).toString(36);
		d.path = f;
        let aFiles = await cfl.search(path.join(VIDFILES_PATH, f));
        d.videos = aFiles
			.filter(v => v.file !== INDEX_FILENAME)
			.map(function(v) {
                ++idVideo;
				return {
                    file: v.file,
                    path: v.path,
					id: idVideo.toString(36)
				};
			});
		oData[f] = d;
	}
	VIDFOLDER_DATA = oData;
}


function init() {
	indexVidFiles().then(function () {
		display.print(AUTOCOMP_LIST.length + ' folders have been indexed.');
		display.print(VIDFILES_LIST.length + ' files have been indexed.');
	});

	indexFolderData().then(function () {
		display.print(Object.keys(VIDFOLDER_DATA).length + ' folder data files have been parsed');
	});
}


/**
 * Search for folder matching the given pattern
 * @returns {Array}
 */
function search(sPattern) {
	let r = new RegExp(sPattern, 'i');
	let aResults = [];
	for (let f in VIDFOLDER_DATA) {
		let d = VIDFOLDER_DATA[f];
		if (('name' in d) && !!d.name.match(r)) {
			aResults.push(d.name);
		} else if (!!f.match(r)) {
			aResults.push(f);
		}
	}
	return aResults;
}

function fullSearch(sPattern) {
	let aResult = search(sPattern).map(v => VIDFOLDER_DATA);
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
	init,
	search,
	getFullName,
	getById,
	setVidFiles,
	getVidFiles: () => VIDFILES_LIST,
	getShowList: () => VIDFOLDER_DATA,
	clear
};