'use strict';
require('dotenv').config();
const baseURL = process.env.PORT ? `${process.env.BASE_URL}:${process.env.PORT}` : process.env.BASE_URL;
module.exports = {
    baseURL,
    apiBaseURL: baseURL+'/api',
    JWTSecret: process.env.SECRET,
}