const fs = require('fs');
const path = require('path');


async function fstat(sPath) {
	return new Promise(function(resolve) {
		fs.stat(sPath, function(err, stats) {
			if (err) {
				throw err;
			} else {
				resolve(stats);
			}
		});
	});
}

async function readdir(sPath) {
	return new Promise(function(resolve) {
		fs.readdir(sPath, function(err, res) {
			if (err) {
				throw err;
			} else {
				resolve(res);
			}
		});
	});
}

/**
 * Recherche tous les fichiers du répertoire spécifié, organise
 * créé une liste d'entrée avec les champs : {
 * 		file:
 * 		path:
 * }
 */
async function cursedSearch(sPath, sSubPath) {
	if (sSubPath === undefined) {
		sSubPath = '';
	}
	let sTotalPath = path.join(sPath, sSubPath);
	return new Promise(async function(resolve) {
		let a = [];
		let aDir = await readdir(sTotalPath);
		for (let i = 0, l = aDir.length; i < l; ++i) {
			let sFile = aDir[i];
			let sCompFile = path.join(sTotalPath, sFile);
			let oStat = await fstat(sCompFile);
			if (oStat.isDirectory()) {
				let aSub = await cursedSearch(sPath, path.join(sSubPath, sFile));
				a = a.concat(aSub);
			} else if (oStat.isFile()) {
				a.push({
					file: sFile,
					path: sSubPath
				});
			}
		}
		resolve(a);
	});
}

module.exports = {
	search: cursedSearch
};