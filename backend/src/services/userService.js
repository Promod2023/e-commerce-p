const checkUserExists = require("../helpers/checkUserExists");
const createError = require('http-errors');
const { createJsonWebToken } = require("../helpers/jsonWebToken");
const { jwtActivationKey, clientUrl, portNo } = require("../secret");
const sendEmail = require("../helpers/sendEmail");
const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { findWithId } = require("./findItemService");
const bcryptjs = require('bcryptjs');

const userProcess = async (name, email, password, address, phone, image )=> {
  try{
      const userExists = await checkUserExists(email);
      if(userExists){throw createError(409, 'User with this email already exist. Please login.');}
      let cart = {};
      for (let i=1000; i < 1300; i++) {
        cart[i]=0;
      }
      const token = createJsonWebToken({name, email, password, phone, address, image, cartData: cart}, jwtActivationKey, '10m');
      const emailData = {
          email,
          subject: 'Account Activation Email',
          html:`
          <h2>Hello ${name} ! </h2>
          <p>Please Click here to <a href="${clientUrl}/user/register/${token}" target="_blank">activate your account</a></p>`
      };
      sendEmail(emailData);
      return token;
  }catch(error){
      throw error;
  };  
};
const userRegister = async (token)=> {
  try{
      if(!token) throw createError(404, 'token not found');
      const decoded = jwt.verify(token, jwtActivationKey);
      if(!decoded) throw createError(401, 'User was not verified');
      const userExists = await Users.exists({email: decoded.email});
      if(userExists){throw createError(402, 'User with this email already exist. Please login.');}
      const user = await Users.create(decoded);
      return user;
  }catch(error){
      throw error;
  };  
};

const getUsers = async (search, limit, page) =>{
    try {
      const searchRegExp = new RegExp('.*' + search + ".*", 'i');
      const filter = {
          isAdmin : {$ne: true},
          $or:[
              {name: {$regex: searchRegExp}},
              {email: {$regex: searchRegExp}},
              {phone: {$regex: searchRegExp}},
          ],
      };
      const options = {password: 0};
      const users = await Users.find(filter, options).limit(limit).skip((page-1)*limit);
      const count = await Users.find(filter).countDocuments();
      if(!users|| users.length == 0) throw createError(404, 'No users found');
      return{
        users,
        pagination: {
            totalPages: Math.ceil(count/limit),
            currentPage: page, 
            previousPage: page - 1 > 0 ? page-1 : null,
            nextPage: page + 1 <= Math.ceil(count/limit) ? page + 1 : null,
            }      
        };
    } catch (error) {
        throw error;
    }
}
const getUser = async(id, options = {})=>{
  try {
    const user = await Users.findById(id, options);
    if(!user) throw createError(404, 'User not found');
    return user;
  } catch (error) {
    throw error;
  }
}
const updateUser = async(userId, req)=>{
  try {
    const options = {password: 0};
          const user = await getUser(userId, options);
          const updateOptions = {new: true, runValidators: true, context: 'query' };
          let updates = {};
          const allowedFields = ['name', 'password', 'phone', 'address'];
          for(const key in req.body){
            if(allowedFields.includes(key)){
              updates[key]= req.body[key];
            }else if([key=='email'].includes[key]){
              throw createError(400, 'Email can not be updated');
            }
          }
          const image = `http://localhost:${portNo}/userImage/${req.file.filename}`;
          /*if(image){
            if(image.size > MAX_SIZE){
              throw createError(400, 'File is too large. It must be less than 2 mb');
            }*/
            updates.image = image;
            /*user.image !== 'default.jpg' && deleteImage(user.image);
          }*/
          delete updates.email;
          const updatedUser = await Users.findByIdAndUpdate(userId, updates, updateOptions).select('-password');
          if(!updatedUser){
            throw createError(404, 'User with this Id doesnot exist');
          }
          return updatedUser;
  } catch (error) {
    throw error;
  }
}
const updatePassword = async (oldPassword, newPassword, userId) =>{
  try {
    const user = await findWithId(Users, userId);
    const isPasswordMatch = bcryptjs.compareSync(oldPassword, user.password);
    if(!isPasswordMatch){
      throw createError(401, 'Old password did not match');
    }
    //const filter = {userId};
    const updates = {$set: {password: newPassword}}
    const updateOptions = {new: true}
    const updatedUser = await Users.findByIdAndUpdate(userId, updates, updateOptions).select('-password');
    if(!updatedUser){throw createError(400, 'User password was not updated successfully');}
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
const forgetPassword = async(email)=>{
  try {
    const userData = await Users.findOne({email: email});
    if(!userData){
      throw createError(404, 'email is incorrect or you have not verified')
    }
    const token = createJsonWebToken({email}, jwtResetPasswordKey, '10m');
        const emailData = {
            email,
            subject: 'rest password Email',
            html:`
            <h2>Hello ${userData.name} ! </h2>
            <p>Please Click here to <a href="${clientUrl}/user/resetPassword/${token}" target="_blank">Reset you password</a></p>`
        };
    sendEmail(emailData);
    return token;
  } catch (error) {
    throw error;
  }
}
const resetPassword = async ()=>{
  try {
    const decoded = jwt.verify(token, jwtResetPasswordKey);
    if(!decoded){
      throw createError(400, 'Invalid or expire token')
    }
    const filter = {email: decoded.email};
    const updates = { password: password};
    const updateOptions = {new: true};
    const updatedUser = await Users.findOneAndUpdate(filter, updates, updateOptions).select('-password');
    if(!updatedUser){throw createError(400, 'Password Reset Failed');}
  } catch (error) {
    throw error;
  }
}

const userStatus = async (userId, action) =>{
  try {
      let update;
        let successMessage;
        if(action =='ban'){
          update = {isBanned: true};
          successMessage = 'User was banned successfully';
        }else if(action=='unban'){
          update = {isBanned:false};
          successMessage = 'User was unbanned successfully';
        }else{
          throw createError(400, 'Invalid action. Use ban or unban');
        }
        const updateOptions = {new: true, runValidators: true, context: 'query' };

        const updatedUser = await Users.findByIdAndUpdate(userId, update, updateOptions).select('-password');
        if(!updatedUser){
          throw createError(400, 'User was not banned successfully');
        }
        return successMessage;
  } catch (error) {
      throw (error);
  }
}
const deleteUser = async(id, options = {})=>{
  try {
    const user = await Users.findByIdAndDelete({_id: id, isAdmin: false});
  } catch (error) {
    throw error;
  }
}
/**/

module.exports =  {userProcess, userRegister, getUsers, getUser, updateUser, updatePassword, forgetPassword, resetPassword, userStatus, deleteUser };