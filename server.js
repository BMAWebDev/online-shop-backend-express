const express = require('express');
const helmet = require('helmet');
const router = require('./router');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const corsConfig = {
  origin: '*',
};
app.use(cors(corsConfig));

// route everything
app.use('/', router);

module.exports = app;
