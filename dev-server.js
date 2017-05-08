'use strict';
/* eslint-disable global-require */

const fs = require('fs');
const spdy = require('spdy');
const path = require('path');
const app = require('./src/index');
const spdyOptions = require('./spdy-options');

const PORT = 4444;

const PUBLIC_PATH = 'src/public';

const livereload = require('livereload');
const lrserver = livereload.createServer(
    {
        https: {
            key: fs.readFileSync(path.join(__dirname, '/certificates/server.key')),
            cert: fs.readFileSync(path.join(__dirname, '/certificates/server.cer'))
        }
    },
    function callbacks(error) {
        if (error) {
            console.error(error);

            return;
        }

        console.log('LiveReload started');
    }
);

lrserver.watch([
    PUBLIC_PATH
]);

spdy.createServer(spdyOptions, app)
    .listen(PORT, (error) => {
        if (error) {
            throw error;
        }

        console.log(`dev server started on port ${PORT}`);
    });
