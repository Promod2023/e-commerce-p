const express = require('express');
const authRouter = express.Router();

const { handleLogin, handleLogout, handleRefreshToken, handleProtectedRoute } = require('../controllers/authController');

authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);
authRouter.get("/refreshToken", handleRefreshToken);
authRouter.get("/protectedRoute", handleProtectedRoute);

module.exports = authRouter;