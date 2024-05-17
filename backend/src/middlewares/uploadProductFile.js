const multer = require("multer");
const path = require('path');
const { UP_DIR_P, FILE_TYPES, MAX_SIZE } = require("../config");

const productStorage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, UP_DIR_P);
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

const uploadProductFile = multer({ 
        storage: productStorage,
        limits: {fileSize: MAX_SIZE}, 
        fileFilter: fileFilter,
    });

module.exports = uploadProductFile;