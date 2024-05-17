const express = require("express");
const userRouter = express.Router();
const {handleUserProcess, handleUserRegister, handleGetUsers, handleGetUser, handleUpdateUser, handleUpdatePassword, handleForgetPassword, handleResetPassword, handleUserStatus, handleDeleteUser } = require('../controllers/userController');
const uploadUserFile = require("../middlewares/uploadUserFile");
const { validateUserData } = require("../validations/userValidation");
const runValidation = require("../validations/runValidation");

userRouter.post('/process', uploadUserFile.single('image'), validateUserData, runValidation, handleUserProcess);
userRouter.post('/register', handleUserRegister);
userRouter.get('/get', handleGetUsers);
userRouter.get('/get/:id([0-9a-fA-F]{24})', handleGetUser);
userRouter.put('/update/:id([0-9a-fA-F]{24})', uploadUserFile.single("image"), handleUpdateUser);
userRouter.put('/updatePassword/:id([0-9a-fA-F]{24})', handleUpdatePassword);
userRouter.post('/forgetPassword', handleForgetPassword);
userRouter.put('/resetPassword', handleResetPassword);
userRouter.put('/userStatus/:id([0-9a-fA-F]{24})', handleUserStatus);
userRouter.delete('/deleteUser/:id([0-9a-fA-F]{24})', handleDeleteUser);

module.exports = userRouter;