const mongoose = require('mongoose');
const { dbUrl } = require('../secret');

const connectDB = async (options={}) =>{
    try {
        await mongoose.connect(dbUrl, options);
        console.log('Connection to DB is successfully established');
        mongoose.connection.on('error', ()=>{
            console.error('DB connection error:', error);
        });
    } catch (error) {
        console.error('could not connect to db:', error.toString());
    }
};

module.exports = connectDB;