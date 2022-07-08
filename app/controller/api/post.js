'use strict';
const { returnError } = require('../../error');
const User = require('../../models').User;
const Post = require('../../models').Post;

module.exports = {
    async get(req, res){
        const post = await Post.findAll()
        res.send(post)
    },
    async paginate(req, res){
        try {
            const user = await User.findByPk(req.userId, { include: 'posts' })
            const { posts } = user
            const page = parseInt(req.query?.page || 1)
            const limit = parseInt(req.query?.limit || 12)
            const start = (page - 1) * limit
            const end = page * limit
            const result = {}
            if(end < posts.length){
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
            result.data = posts.slice(start, end)
            return res.send(result)
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    },
    async store(req, res){
        try {
            const { title, slug, body } = req.body;
            const notUniqueSlug = await Post.findOne({ where: { slug } })
            if(notUniqueSlug)return returnError(res, 422, 'Slug is already taken!')
            const post = await Post.create({
                title, slug, body,
                userId: req?.userId
            })
            res.send(post)
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    },
    async show(req, res){
        try {
            const post = await Post.findByPk(req.params?.id)
            if(!post)return returnError(res, 400, 'Post not found')
            res.send(post)
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    },
    async update(req, res){
        try {
            const { title, slug, body } = req.body;
            const post = await Post.findByPk(req.params?.id)
            if(!post)return returnError(res, 400, 'Post not found')
            const uppost = await post.update({
                title, slug, body
            })
            if(!uppost)return returnError(res, 400, 'Post not updated')
            res.send(uppost)
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    },
    async delete(req, res){
        try {
            const del = await Post.destroy({ where: { id: req.params?.id }})
            if(!del)return returnError(res, 400, 'Post not found')
            res.send({
                message: 'Post deleted successfully'
            })
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    }
}