const {body} = require("express-validator");

const validateProductData = [
    body("name").trim().notEmpty().withMessage("Product name is required").isLength({min: 3, max: 150}).withMessage('Product should be at least 3-150 characters long'),
    body("description").trim().notEmpty().withMessage("description name is required").isLength({min: 3}).withMessage('Product should be at least 3 characters long'),
    body("new_price").trim().notEmpty().withMessage("Price is required").isFloat({min: 0}).withMessage('Price must be a positive number'),
    body("old_price").trim().notEmpty().withMessage("Price is required").isFloat({min: 0}).withMessage('Price must be a positive number'),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("quantity").trim().notEmpty().withMessage("quantity is required").isInt({min: 1}).withMessage('quantity must be a positive number'),
    body("image").optional().isString().withMessage("Product image is Optional"),
]
const validateProductCategoryData = [
    body("name").trim().notEmpty().withMessage("Category name is required").isLength({min: 3}).withMessage('Name should be at least 3 characters long'),
]

module.exports = { validateProductData, validateProductCategoryData };