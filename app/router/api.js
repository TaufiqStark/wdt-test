'use strict';
const express = require('express');
const router = express.Router();
const { authController, postController, commentController } = require('../controller/api/index')

router.use(authController.verifyToken)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/reset-password', authController.resetPassword)
router.post('/reset-password/:id/:salt', authController.changePassword)
router.get('/profile', [authController.mustLogin, authController.profile])

router.all('/posts', authController.mustLogin)
router.get('/posts', postController.paginate)
router.post('/posts', postController.store)
router.get('/posts/:id', postController.show)
router.put('/posts/:id', postController.update)
router.delete('/posts/:id', postController.delete)

router.get('/posts/:post/comments', commentController.paginate)
router.post('/posts/:post/comments', commentController.store)
router.get('/comments/:id', commentController.show)
router.put('/comments/:id', commentController.update)
router.delete('/comments/:id', commentController.delete)

module.exports = router;