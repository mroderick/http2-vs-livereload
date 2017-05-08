'use strict';

const express = require('express');
const staticResourcesApp = express.static(`${__dirname}/public/`);

const app = express();

app.use(staticResourcesApp);

module.exports = app;
