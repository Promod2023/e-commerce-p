const multer = require("multer");
const path = require('path');

const {UP_DIR_U, FILE_TYPES, MAX_SIZE } = require("../config/index");

const userStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, UP_DIR_U);
    },    
    filename: function(req, file, cb){
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
});
const fileFilter = (req, file, cb) =>{
    if(!FILE_TYPES.includes(file.mimetype)){
    return cb(new Error('File type are not allowed'), false);
    }
    cb(null, true);
};
const uploadUserFile = multer({ 
    storage: userStorage,
    limits: {fileSize: MAX_SIZE}, 
    fileFilter: fileFilter,
});

module.exports = uploadUserFile;