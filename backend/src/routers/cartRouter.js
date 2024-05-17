const express = require('express');
const { fetchUser } = require('../middlewares/fetchUser');
const { handleAddCart, handleRemoveFromCart, handleGetCart } = require('../controllers/cartController');
const cartRouter = express.Router();

cartRouter.post("/add", fetchUser, handleAddCart);
cartRouter.post("/remove", fetchUser, handleRemoveFromCart);
cartRouter.post("/get", fetchUser, handleGetCart);

module.exports = cartRouter;