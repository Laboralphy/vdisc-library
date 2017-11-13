/**
 * Created by ralphy on 24/08/17.
 */
const vr = require('../models/vidfiles');

module.exports = {
    list: function(req, res) {
        res.send(vr.getShowList());
    }
};