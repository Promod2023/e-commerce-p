const Products = require("../models/productModel");
const createError = require('http-errors');
const { successResponse } = require("./responseController");
const slugify = require('slugify');
const { portNo } = require("../secret");
const { getProducts } = require("../services/productServices");

const handleCreateProduct = async (req, res, next)=>{
        try{
            const { name, image, category, description, new_price, old_price, quantity, sold } = req.body;
            let products = await Products.find({});
            let id;
            if(products.length>0){
                let last_product_array = products.slice(-1);
                let last_product = last_product_array[0];
                id = last_product.id + 1;
            } else{
                id = 1000;
            }
            const image_link = `http://localhost:${portNo}/productImage/${req.file.filename}`
            const productExists = await Products.exists({name: name});
            if(productExists){throw createError(409, 'Product with this name already exist');}
            const product = await Products.create({id: id, name: name, image: image_link, slug: slugify(name), category: category, description: description, new_price: new_price, old_price: old_price, quantity: quantity, sold: sold });
            return successResponse(res, { 
            statusCode: 200,
            message: `product was created successfully`,
            payload: {product},
          });
        }catch(error){
            next(error);
        };  
    };
    const handleGetProducts = async(req, res, next)=>{
        try {
            const page = Number(req.query.page)||1;
            const limit = Number(req.query.limit)||100;
            const {products, pagination} = await getProducts(limit, page);
            res.send(products)
            /*return successResponse(res, { 
                statusCode: 200,
                message: 'Products were returned successfully',
                payload:{
                users: [products],
                pagination: pagination,
                }
            });*/
        } catch (error) {
            next(error);
        }
    }
const handleNewCollection = async(req, res)=>{
    let products = await Products.find({});
    let newCollections = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newCollections);
}

const handlePopularInWomen = async(req, res)=>{
    let products = await Products.find({category:"women"});
    let popular_in_women =products.slice(0, 4);
    console.log("Popular in women fetch");
    res.send(popular_in_women);
}

const handleRemoveProduct= async (req, res)=>{
    await Products.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
}
module.exports = { handleCreateProduct, handleGetProducts, handleNewCollection, handlePopularInWomen, handleRemoveProduct };