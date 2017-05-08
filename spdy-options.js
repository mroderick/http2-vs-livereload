'use strict';

const fs = require('fs');
const path = require('path');
const WINDOW_SIZE = 1048576;

module.exports = {
    key: fs.readFileSync(path.join(__dirname, '/certificates/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '/certificates/server.cer')),
    // **optional** SPDY-specific options
    spdy: {
        protocols: ['h2', 'spdy/3.1', 'http/1.1'],
        plain: false,

        // **optional**
        // Parse first incoming X_FORWARDED_FOR frame and put it to the
        // headers of every request.
        // NOTE: Use with care! This should not be used without some proxy that
        // will *always* send X_FORWARDED_FOR
        'x-forwarded-for': true,

        connection: {
            windowSize: WINDOW_SIZE, // Server's window size

            // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
            autoSpdy31: false
        }
    }
};
