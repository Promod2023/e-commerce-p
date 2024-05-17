const { portNo } = require("../secret");
const { userProcess, userRegister, getUsers, getUser, updateUser, updatePassword, forgetPassword, resetPassword, userStatus, deleteUser } = require("../services/userService");
const { successResponse } = require("./responseController");

const handleUserProcess = async (req, res, next)=> {
    try{
        const { name, email, password, address, phone } = req.body;
        const image = `http://localhost:${portNo}/userImage/${req.file.filename}`
        const token = await userProcess( name, email, password, address, phone, image);
      return successResponse(res, { 
        statusCode: 200,
        message: `Please go to your ${email} for completing your registration process`,
        payload: {
          message: `http://localhost:${portNo}/userImages/${req.file.filename}`,
          token: token,
        },
      });
    }catch(error){
        next(error);
    };  
};
const handleUserRegister = async (req, res, next)=> {
        try{
            const token = req.body.token;
            const user = await userRegister(token);
            return successResponse(res, { 
            statusCode: 201,
            message: `User was registerd successfully`,
            payload: {user},
          });
        }catch(error){
            next(error);
        };  
};
const handleGetUsers = async (req, res, next)=>{
  try{
      const search = req.query.search||"";
      console.log(search);
      const page = Number(req.query.page)||1;
      const limit = Number(req.query.limit)||2;
   const {users, pagination} = await getUsers(search, limit, page);
   return successResponse(res, { 
      statusCode: 200,
      message: 'users were returned successfully',
      payload:{
          users: users,
          pagination: pagination,
      }
  });
  }catch(error){
      next(error);
  }  
};
const handleGetUser = async (req, res, next)=>{
  try{
    const id = req.params.id;
    const options = {password: 0};
    const user = await getUser(id, options);
    return successResponse(res, { 
      statusCode: 200,
      message: 'users were returned successfully',
      payload:{user},
    });
  }catch(error){
      next(error);
  }  
};
const handleUpdateUser = async (req, res, next)=>{
        try{
          const userId = req.params.id;
          const updatedUser = await updateUser(userId, req);
          return successResponse(res, { 
            statusCode: 200,
            message: 'Users was updated successfully',
            payload:{updatedUser},
          });
        }catch(error){
            next(error);
        }  
};
const handleUpdatePassword = async (req, res, next) =>{
  try {
    const {oldPassword, newPassword, confirmedPassword} = req.body;
    const userId = req.params.id;
    const updatedUser = await updatePassword(oldPassword, newPassword, userId);
    return successResponse(res, { 
      statusCode: 200,
      message: 'User password was updated successfully',
      payload: {updatedUser},
    });
  } catch (error) {
    next(error);
  }
};
const handleForgetPassword = async (req, res, next) =>{
  try {
    const {email} = req.body;
    const token = await forgetPassword(email);
        return successResponse(res, { 
        statusCode: 200,
        message: `Please go to your ${email} to reset you password`,
        payload: {token},
      });
  } catch (error) {
    next(error);
  }
};
const handleResetPassword = async (req, res, next) =>{
  try {
    const {token, password} = req.body;
    await resetPassword(token, password);
    return successResponse(res, { 
      statusCode: 200,
      message: 'User password reset successfully',
    });
  } catch (error) {
    next(error);
  }
};
const handleUserStatus = async (req, res, next)=>{
        try{
          const userId = req.params.id;
          const action = req.body.action;
          console.log(action);
          const successMessage = await userStatus(userId, action);
          return successResponse(res, { 
            statusCode: 200,
            message: successMessage,
          });
        }catch(error){
            next(error);
        }  
};
const handleDeleteUser = async (req, res, next)=>{
        try{
          const id = req.params.id;
          const options = {password: 0};
          await deleteUser(id, options);
          return successResponse(res, { 
            statusCode: 200,
            message: 'users was deleted successfully',
          });
        }catch(error){
            next(error);
        }  
};/**/

module.exports = {handleUserProcess, handleUserRegister, handleGetUsers, handleGetUser, handleUpdateUser, handleUpdatePassword, handleForgetPassword, handleResetPassword, handleUserStatus, handleDeleteUser };