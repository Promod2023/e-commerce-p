const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is missing'],
        trim: true, 
        minlength: [3, 'User name can be minimum 3 character'],
        maxlength: [31, 'User name can be maximum 31 character'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'user Password is required'],
        trim: true,
        unique: true,
        lowercase: false,
        minlength: [6, 'password length should be minimum 6 characters'],
        set: (v) => bcryptjs.hashSync(v, bcryptjs.genSaltSync(10)),
    },
    image:{
        type: String,
        contentType: String,
        required:[true, 'User image is required'],
    },
    address: {
        type: String,
        required: [true, 'User address is required'],
        minlength: [6, 'Address length should be minimum 2 characters'],
    },
    phone: {
        type: String,
        required: [true, 'User phone is required'],
    },
    cartData:{
        type: Object,
        required: [true, 'cartData is required']
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
}, {timestamps:true});

const Users = model ('users', userSchema );
module.exports = Users;