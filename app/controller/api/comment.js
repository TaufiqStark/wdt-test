'use strict';
const Post = require('../../models').Post;
const Comment = require('../../models').Comment;
const { returnError } = require('../../error');
module.exports = {
    async paginate(req, res){
        try {
            const post = await Post.findByPk(req.params?.post, { include: 'comments' })
            const { comments } = post
            const page = parseInt(req.query?.page || 1)
            const limit = parseInt(req.query?.limit || 12)
            const start = (page - 1) * limit
            const end = page * limit
            const result = {}
            if(end < comments.length){
                result.next = {
                    page: page + 1,
                    limit,
                }
            }
            if(start > 0){
                result.previus = {
                    page: page - 1,
                    limit,
                }
            }
            result.data = comments.slice(start, end)
            return res.send(result)
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    },
    async store(req, res){
        try {
            const { body } = req.body;
            const comment = await Comment.create({
                body,
                postId: req.params?.post,
                userId: req?.userId
            })
            res.send(comment)
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    },
    async show(req, res){
        try {
            const comment = await Comment.findByPk(req.params?.id)
            if(!comment)return returnError(res, 400, 'Comment not found')
            res.send(comment)
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    },
    async update(req, res){
        try {
            const { body } = req.body;
            const comment = await Comment.findByPk(req.params?.id)
            if(!comment)return returnError(res, 400, 'Comment not found')
            const upcomment = await comment.update({ body })
            if(!upcomment)return returnError(res, 400, 'Comment not updated')
            res.send(upcomment)
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    },
    async delete(req, res){
        try {
            const del = await Comment.destroy({ where: { id: req.params?.id }})
            if(!del)return returnError(res, 400, 'Comment not found')
            res.send({
                message: 'Comment deleted successfully'
            })
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    }
}