'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { returnError } = require('../../error');
const User = require('../../models').User;

module.exports = {
    async register(req, res){
        try{
            const user = await User.findOne({ where: { email: req.body?.email } })
            console.log(user)
            if(user)return returnError(res, 422, 'Email is already taken!')
            await User.create({
                name: req.body?.name,
                email: req.body?.email,
                password: bcrypt.hashSync(req.body?.password)
            }).then(user=>res.send(user.json()))
        }catch(e){
            returnError(res)
            console.error(e)
        }
    },
    async login(req, res){
        try{
            const user = await User.findOne({ where: { email: req.body?.email } })
            const token = user?.createToken({ bcrypt, jwt, secret: config.JWTSecret, password: req.body?.password })
            console.log(token)
            if(!user || !token)return returnError(res, 401, 'Email or password incorrect')
            return res.send({
                message: `Welcome back ${user.name}!`,
                access_token: token
            })
        }catch(e){
            returnError(res)
            console.error(e)
        }
    },
    verifyToken(req, res, next){
        let token = req.headers['authorization'] || req.headers['x-access-token'] || ''
        // if (token.split(' ')[0] !== 'Bearer') {
        //     return returnError(res, 422, 'Incorrect token format')
        token = token.split(' ')[1]
        jwt.verify(token, config.JWTSecret, (err, decoded)=>{
            if(err)return req.isLogin = false
            req.userId = decoded.id
            req.isLogin = true
        })
        next()
    },
    mustLogin(req, res, next){
        if(!req.isLogin)return returnError(res, 401, 'Unauthorized')
        next()
    },
    async resetPassword(req, res){
        try{
            const user = await User.findOne({ where: { email: req.body?.email } })
            let link = `${config.apiBaseURL}/reset-password/${user.id}/${ encodeURIComponent(bcrypt.getSalt(user.password))}`
            return res.send({
                link,
                message: 'Post new password to this link',
            })
        }catch(e){
            returnError(res)
            console.error(e)
        }
    },
    async changePassword(req, res){
        try{
            const user = await User.findOne({ where: { id: req.params?.id } })
            if(bcrypt.getSalt(user.password) !== decodeURIComponent(req.params?.salt))return returnError(res, 400, 'Invalid reset link')
            const newuser = await user.update({
                password: bcrypt.hashSync(req.body?.password, 9)
            })
            if(newuser)return res.send({
                message: 'Password changed successfully'
            })
        }catch(e){
            returnError(res)
            console.error(e)
        }
    },
    async profile(req, res){
        try {
            const user = await User.findOne({ where: { id: req?.userId } })
            res.send(user.json())
        } catch (e) {
            returnError(res)
            console.error(e)
        }
    }
}