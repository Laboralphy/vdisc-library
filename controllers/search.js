/**
 * Created by ralphy on 24/08/17.
 */
const vr = require('../models/video-repository');

module.exports = {
	preview: function(req, res) {
		res.send(vr.search(req.params.pattern, true));
	},
	search: function(req, res) {
		res.send(vr.search(req.params.pattern, false));
	},
	stat: function(req, res) {
		res.send(vr.getById(req.params.id, false));
	}
};