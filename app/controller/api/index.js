'use strict';
const authController = require('./auth')
const postController = require('./post')
const commentController = require('./comment')

module.exports = {
    authController,
    postController,
    commentController
}