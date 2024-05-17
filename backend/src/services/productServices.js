const Products = require("../models/productModel");
const createError = require ('http-errors')

const getProducts = async (limit, page) =>{
    try {
      const products = await Products.find({}).limit(limit).skip((page-1)*limit);
      const count = await Products.find({}).countDocuments();
      if(!products|| products.length == 0) throw createError(404, 'No Products found');
      return{
        products,
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

module.exports = { getProducts } 