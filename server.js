'use strict';
require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./app/models');
const logger = require('morgan');
const { returnError } = require('./app/error');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("app/public"));

const title = process.env.TITLE;
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api', require('./app/router/api'))
app.all('/*', (req, res)=>returnError(res, 404, 'Not Found'))
db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`${title} run on ${baseUrl}:${port}`))
});