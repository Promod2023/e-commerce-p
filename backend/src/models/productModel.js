const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: [true, 'Product name is missing'],
        trim: true, 
        minlength: [3, 'Product name can be minimum 3 character'],
        maxlength: [150, 'Product name can be maximum 150 character'],
    },
    slug: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true,
        lowercase: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
        /*type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,*/
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
        minlength: [3, 'description can be minimum 3 character'],
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is missing'],
        trim: true,
        validate:{
            validator: (v)=> v>0,
            message:(props)=>`${props.value} is not a valid quantity! product quantity must be greater than Zero`,
        },
    },
    sold: {
        type: Number,
        required: [true, 'sold quantity is missing'],
        trim: true,
        default: 1,
        validate:{
            validator: (v)=> v>0,
            message:(props)=>`${props.value} is not a valid sold quantity! sold quantity must be greater than Zero`,
        },
    },
    shipping:{
        type: Number,
        default: 0,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    avilable:{
        type: Boolean,
        default: true,
    },
},{timestamps:true});

const Products = model ('products', productSchema);
module.exports = Products;

