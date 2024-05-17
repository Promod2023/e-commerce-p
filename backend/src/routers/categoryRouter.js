const express = require("express");
const categoryRouter = express.Router();
const { handleCreateCategory, handleGetCategories, handleGetCategory, handleUpdateCategory, handleDeleteCategory } = require("../controllers/categoryController");

categoryRouter.post("/create", handleCreateCategory);
categoryRouter.get("/get", handleGetCategories);
categoryRouter.get("/get/:slug", handleGetCategory);
categoryRouter.put("/update/:slug",  handleUpdateCategory);
categoryRouter.delete("/delete/:slug", handleDeleteCategory);


module.exports = categoryRouter;