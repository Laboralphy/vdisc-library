/**
 * Created by ralphy on 24/08/17.
 */
const vr = require('../models/video-repository');

module.exports = {
	preview: function(req, res) {
		res.send(vr.search(req.params.pattern));
	},
	search: function(req, res) {
		res.send(vr.search(req.params.pattern)); //  vr.search(req.params.pattern
	},
	stat: function(req, res) {
		res.send(vr.getById(req.params.id, false));
	}
};