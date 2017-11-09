/**
 * Created by ralphy on 25/08/17.
 */
const path = require('path');
const fs = require('fs');
const CONFIG = require('../config');
const PATH_THUMBNAILS = path.join(__dirname, '../', CONFIG.paths.thumbnails);
const NOT_FOUND_IMAGE = path.join(PATH_THUMBNAILS, 'not-found.jpg');

/**
 * Vérifie l'existance d'un fichier image...
 * Complete le nom du fichier avec le répertoire
 * Resout la promise avec le nom du fichier complet
 * sinon resout la promise avec un nom de fichier par défaut 404
 * @param sImage {string} nom de la miniature
 * @return {Promise}
 */
async function checkImageFile(sImage) {
	return new Promise(function(resolve) {
		let sFile = path.join(PATH_THUMBNAILS, sImage);
		fs.stat(sFile, function (err, stats) {
			if (err) {
				// not found
				resolve(NOT_FOUND_IMAGE);
			} else {
                resolve(sFile);
			}
		});
	});
}

module.exports = {
	image: async function(req, res) {
        res.sendFile(await checkImageFile(req.params.file));
	}
};