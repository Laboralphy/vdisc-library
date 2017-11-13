const path = require('path');
const express = require('express');
const app = express();
const CONFIG = require('./config');
const display = require('./helpers/display');

display.print('--------------------');
display.print('Anime Library Server');
display.print('--------------------');

app.use(express.static(path.join(__dirname, 'public')));


const vr = require('./models/vidfiles');
vr.init();


// SEARCH
const ctlSearch = require('./controllers/search');

// autocomplete suggestion
app.get('/search/p/:pattern([-!\' +0-9A-Za-z]+)', ctlSearch.preview);

// real search
app.get('/search/s/:pattern([-!\' +0-9A-Za-z]+)', ctlSearch.search);

// get info
app.get('/stat/:id([0-9a-z]+)', ctlSearch.stat);



// SHOW
const ctlShow = require('./controllers/show');

// get list
app.get('/show/list', ctlShow.list);


// THUMBNAILS
const ctlThumbnails = require('./controllers/thumbnails');
app.get('/thumbnails/:file([-.0-9a-z]+)', ctlThumbnails.image);


app.listen(CONFIG.port, function () {
    display.print('server listening. port:', CONFIG.port, '. env:', app.get('env'));
});

