const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require("../secret");

const isLoggedIn = async (req, res, next) =>{
    try {
        const token = req.cookies.accessToken;
        if(!token){
            throw createError(401, 'Access token not found. Please login');
        }
        const decoded = jwt.verify(token, jwtAccessKey);
        if(!decoded){
            throw createError(401, 'Invalid access token. Please login again');
        }
        req.user = decoded.user;
        next();
    } catch (error) {
        return next(error);
    }
}
const isLoggedOut = async (req, res, next) =>{
    try {
        const accessToken = req.cookies.accessToken;
        if(accessToken){
            try {
                const decoded = jwt.verify(token, jwtAccessKey);
                if(decoded){
                    throw createError(400, 'User is all ready logged in');
                }
            } catch (error) {
                throw error;
            } 
        }
        next();
    } catch (error) {
        return next(error);
    }
}

const isAdmin = async (req, res, next) =>{
    try {
        console.log(req.user.isAdmin);
        if(!req.user.isAdmin){
            throw createError(403, 'Forbidden, you must be an admin to access this resources')
        }
        next();
    } catch (error) {
        return next(error);
    }
}

module.exports = {isLoggedIn, isLoggedOut, isAdmin};
