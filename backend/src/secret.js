require("dotenv").config();

const portNo =  process.env.portNo || '3002';
const dbUrl= process.env.dbUrl || 'mongodb://localhost:27017/e-commerce';
const jwtActivationKey = process.env.jwtActivationKey || 'JWT_ACTIVATION_KEY';
const jwtAccessKey = process.env.jwtAccessKey || 'JWT_ACCESS_KEY';
const jwtRefreshKey = process.env.jwtRefreshKey || 'JWT_REFRESH_KEY';
const jwtResetPasswordKey = process.env.jwtResetPasswordKey||'JWT_RESET_PASSWORD_KEY';
const smtpUserName = process.env.smtpUserName|| 'promodkumerdey@gmail.com';
const smtpPassword = process.env.smtpPassword|| 'saxq qjio zfwj hrxd';
const clientUrl = process.env.clientUrl || 'http://localhost:3000';
const defaultImagePathForUsers = process.env.defaultImagePathForUsers||'public/images/users';
const defaultImagePathForProducts = process.env.defaultImagePathForProducts||'public/images/products';

module.exports = {portNo, dbUrl, jwtActivationKey, smtpPassword, smtpUserName, clientUrl, defaultImagePathForUsers, defaultImagePathForProducts, jwtAccessKey, jwtResetPasswordKey, jwtRefreshKey};