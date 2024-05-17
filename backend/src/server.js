const { portNo } = require('./secret');
const app = require('./app');
//const connectDB = require('./config/connectDB');

const mongoose = require('mongoose'); mongoose.connect("mongodb://localhost:27017/e-commerce").then(()=>console.log("Db is connected")).catch((error)=>{console.log("db is not connected"); console.log(error); process.exit(1);})

app.listen(portNo, async (error)=>{
    console.log(`server is running at: http://localhost:${portNo}`);
    /*await connectDB();*/
});