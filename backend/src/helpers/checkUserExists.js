const Users = require('../models/userModel');

const checkUserExists = async (email)=>{
    return await Users.exists({email: email});
};

module.exports = checkUserExists;