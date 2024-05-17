const express = require("express");
const productRouter = express.Router();
const uploadProductFile = require("../middlewares/uploadProductFile");
const { handleCreateProduct, handleGetProducts, handleNewCollection, handlePopularInWomen, handleRemoveProduct } = require("../controllers/productController");

productRouter.post("/create", uploadProductFile.single("image"), handleCreateProduct);
productRouter.get("/get", handleGetProducts);
productRouter.get("/newCollection", handleNewCollection);
productRouter.get("/popularInWomen", handlePopularInWomen);
productRouter.post("/removeProduct", handleRemoveProduct);

module.exports = productRouter;