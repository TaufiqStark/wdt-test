'use strict';
module.exports = {
    returnError(res, statusCode=500, message='An Error occured'){
        res.status(statusCode).send({
            message
        })
    }
}