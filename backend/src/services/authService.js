const { setAccessTokenCookie, setRefreshTokenCookie } = require("../helpers/cookie");
const { createJsonWebToken } = require("../helpers/jsonWebToken");
const Users = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtAccessKey, jwtRefreshKey } = require("../secret");
const createError = require('http-errors');

const login = async (email, password)=>{
    try {
        const user = await Users.findOne({email});
        if(!user){
            throw createError(404, 'User with this email does not exist. Please register first');
        }
        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if(!isPasswordMatch){
            throw createError(401, 'Email or Password did not match');
        }
        if(user.isBanned){
            throw createError(403, 'You are Banned. Please contact authority');
        }
        /*const accessToken = createJsonWebToken({user}, jwtAccessKey, '10m');
        setAccessTokenCookie(res, accessToken);
        const refreshToken = createJsonWebToken({user}, jwtRefreshKey, '7d');
        setRefreshTokenCookie(res, refreshToken);
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;*/
        const data = {user: {id: user.id}};
        const token = jwt.sign(data, jwtAccessKey);
        return token;
    } catch (error) {
        throw error;
    }
}
const logout = async()=>{
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
    } catch (error) {
        throw error;
    }
}
const refreshToken = async (oldRefreshToken)=>{
    try {
        const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);
        if(!decodedToken){
            throw createError(401, 'Invalid refresh token. Please login again');
        }
        const accessToken = createJsonWebToken(decodedToken.user, jwtAccessKey, '5m');
        setAccessTokenCookie(res, accessToken);
    } catch (error) {
        throw error;
    }
    
}
const protectedRoute = async(accessToken)=>{
    try {
        const decodedToken = jwt.verify(accessToken, jwtAccessKey);
        if(!decodedToken){
            throw createError(401, 'Invalid access token. Please login again');
        }
    } catch (error) {
        throw error;
    }
}
module.exports = {login, logout, refreshToken, protectedRoute}