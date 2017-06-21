const path = require('path');
const express = require('express');
const app = express();
const controllers = require('./controllers');
const CONFIG = require('./config');
const display = require('./helpers/display');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', controllers.hello);

app.listen(CONFIG.port, function () {
    display.print('--------------------');
    display.print('Anime Library Server');
    display.print('--------------------');
    display.print('server listening. port:', CONFIG.port, '. env:', app.get('env'));
});

