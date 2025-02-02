const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true, 
        unique: true,
        minlength: [3, 'category name can be minimum 3 character'],
        maxlength: [31, 'category name can be maximum 31 character'],
    },
    slug: {
        type: String,
        required: [true, 'Category slug is required'],
        lowercase: true, 
        unique: true,
    },
}, {timestamps:true});

const Category = model ('Category', categorySchema );
module.exports = Category;