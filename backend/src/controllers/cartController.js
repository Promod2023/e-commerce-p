const Users = require("../models/userModel");


const handleAddCart = async (req, res)=>{
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findByIdAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Added");
}

const handleRemoveFromCart = async(req, res)=>{
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findByIdAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Removed");
}

const handleGetCart = async(req, res)=>{
    console.log("GetCart")
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
}

module.exports = {handleAddCart, handleRemoveFromCart, handleGetCart}