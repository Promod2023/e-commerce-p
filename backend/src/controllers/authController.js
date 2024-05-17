const { successResponse } = require('./responseController');
const { login, logout, refreshToken, protectedRoute } = require('../services/authService');

const handleLogin = async (req, res, next) =>{
    try {
        const {email, password} = req.body;
        const token = await login(email, password);
        //console.log(token);
        res.json({success: true, token});
    } catch (error) {
        next(error);
    }
}
const handleLogout = async (req, res, next) =>{
    try {
        await logout();
        return successResponse(res, { 
            statusCode: 200,
            message: `User was loggedout successfully`,
            payload: {},
          });
        
    } catch (error) {
        next(error);
    }
}
const handleRefreshToken = async (req, res, next) =>{
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        await refreshToken(oldRefreshToken);
        return successResponse(res, { 
            statusCode: 200,
            message: `new access code is generated`,
            payload: {},
          });
        
    } catch (error) {
        next(error);
    }
}
const handleProtectedRoute = async (req, res, next) =>{
    try {
        const accessToken = req.cookies.accessToken;
        await protectedRoute(accessToken);
        return successResponse(res, { 
            statusCode: 200,
            message: `Protected resourcess accesss successfully`,
            payload: {},
          });
        
    } catch (error) {
        next(error);
    }
}

module.exports = {handleLogin, handleLogout, handleRefreshToken, handleProtectedRoute};