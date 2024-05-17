const createError = require('http-errors');
const bodyParser = require('body-parser');
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const { errorResponse } = require('./controllers/responseController');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const path = require('path');
const categoryRouter = require('./routers/categoryRouter');
const authRouter = require('./routers/authRouter');
const cartRouter = require('./routers/cartRouter');

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/userImage', express.static(path.join(__dirname, '../uploadFiles/images/users')));
app.use('/productImage', express.static(path.join(__dirname, '../uploadFiles/images/products')));

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/userAuth', authRouter);
app.use('/cart', cartRouter);


app.use((req, res, next)=>{
    next(createError(404, 'route not found'));
});
app.use((err, req, res, next)=>{
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message,
    });
});

module.exports = app;