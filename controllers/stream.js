/**
 * adapted from a js file found on github
 * original author : davidgatti/How-to-Stream-Movies-using-NodeJS
 */
let fs = require('fs');
let path = require('path');
let vr = require('../models/video-repository');

function serveStream(file, res) {
	// Get meta information from the file. In this case we are interested in its size.
	file = vr.getFullName(file);
	fs.stat(file, function(err, stats) {
		if (err) {
			// there was an error
			if(err.code === 'ENOENT') {
				// file does not exists
				return res.sendStatus(404);
			}
			throw err;
		}
		// no error : continue
		let range = req.headers.range;
		if (!range) {
			// bad range !
			let err = new Error('wrong range');
			err.status = 416;
			throw err;
		}
		// process ranges
		let positions = range.replace(/bytes=/, '').split('-');
		let start = parseInt(positions[0], 10);
		let fileSize = stats.size;
		let end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;
		let chunksize = (end - start) + 1;
		// make http header
		let head = {
			'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/webm'
		};
		// send header
		res.writeHead(206, head);
		let streamPosition = {
			start: start,
			end: end
		};
		let stream = fs.createReadStream(file, streamPosition);
		stream.on('open', function() {
			stream.pipe(res);
		});
		stream.on('error', function(err) {
			throw err;
		});
	});
}

module.exports = {
	index: function(req, res) {
		serveStream(req.params.file, res);
	}
};