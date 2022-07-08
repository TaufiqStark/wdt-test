'use strict';
module.exports = {
    returnError(res, statusCode=500, message='An Error occured'){
        let status = ''
        switch(statusCode){
            case 200:
                status = 'OK'
                break;
            case 400:
                status = 'Bad Request'
                break;
            case 401:
                status = 'Unauthorized'
                break;
            case 404:
                status = 'Not Found'
                break;
            case 500:
                status = 'Internal Server Error'
                break;
        }
        res.status(statusCode).send({
            statusCode,
            status,
            message
        })
    }
}