const createError = require("http-errors");
const { successResponse } = require("./responseController");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../services/categoryService");


const handleCreateCategory = async (req, res, next)=> {
    try{
        const {name} = req.body;
        await createCategory(name);
        return successResponse(res, { 
        statusCode: 201,
        message: `Category was created successfully`,
      });
    }catch(error){
        next(error);
    };  
};
const handleGetCategories = async (req, res, next)=> {
    try{
        const categories = await getCategories();
        return successResponse(res, { 
        statusCode: 200,
        message: `Categories fatched successfully`,
        payload: categories,
      });
    }catch(error){
        next(error);
    };  
};
const handleGetCategory = async (req, res, next)=> {
    try{
        const {slug} = req.params;
        const Category = await getCategory(slug);
        return successResponse(res, { 
        statusCode: 200,
        message: `Categories fatched successfully`,
        payload: Category,
      });
    }catch(error){
        next(error);
    };  
};
const handleUpdateCategory = async (req, res, next)=> {
    try{
        const {name} = req.body;
        const {slug} = req.params;
        const updatedCategory = await updateCategory(name, slug);
        if(!updatedCategory){
            throw createError(404, 'Category not found' )
        }
        return successResponse(res, { 
        statusCode: 200,
        message: `Category was Updated successfully`,
        payload:{updatedCategory},
      });
    }catch(error){
        next(error);
    };  
};
const handleDeleteCategory = async (req, res, next)=> {
    try{
        const {slug} = req.params;
        const result = await deleteCategory(slug);
        if(!result){
            throw createHttpError(404, 'Category not found with this slug' )
        }
        return successResponse(res, { 
        statusCode: 200,
        message: `Category was Deleted successfully`,
      });
    }catch(error){
        next(error);
    };  
};/**/
module.exports = {handleCreateCategory, handleGetCategories, handleGetCategory, handleUpdateCategory, handleDeleteCategory/**/};

