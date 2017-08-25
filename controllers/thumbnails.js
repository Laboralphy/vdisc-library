/**
 * Created by ralphy on 25/08/17.
 */
const path = require('path');
const fs = require('fs');
const CONFIG = require('../config');
const PATH_THUMBNAILS = path.join(__dirname, '../', CONFIG.paths.thumbnails);

async function loadImage(sImage) {
	return new Promise(function(resolve) {
		fs.readFile(sImage, function (err, data) {
			if (err) {
				throw err;
			} else {
				resolve(data);
			}
		});
	});
}

module.exports = {
	image: function(req, res) {
		res.sendFile(path.join(PATH_THUMBNAILS, 'default.jpg'));
	}
};