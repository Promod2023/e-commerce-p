const {body} = require("express-validator");

const validateUserData = [
    body("name").trim().notEmpty().withMessage("name is required").isLength({min: 3, max: 31}).withMessage('Name should be at least 3-31 characters long'),
    body("email").trim().notEmpty().withMessage("email is required").isEmail().withMessage('Invalid Email Address'),
    body("password").trim().notEmpty().withMessage("password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/).withMessage('Password should be 8 to 15 characters long an also contain at least one uppercase letter, one lower case letter, one special character'),
    body("address").trim().notEmpty().withMessage("Address is required").isLength({min:3}).withMessage('Address should be at least 03 characters long'),
    body("phone").trim().notEmpty().withMessage("Phone is required"),
    body("image").optional().isString().withMessage("User image is Optional"),
]
const validateUserLogin = [
    body("email").trim().notEmpty().withMessage("email is requied").isEmail().withMessage('Invalid Email Address'),
    body("password").trim().notEmpty().withMessage("password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/).withMessage('Password should be 8 to 15 characters long an also contain at least one uppercase letter, one lower case letter, one special character'),
]
const validateUpdatePassword = [
    body("oldPassword").trim().notEmpty().withMessage("old password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/).withMessage('old Password should be 8 to 15 characters long an also contain at least one uppercase letter, one lower case letter, one special character'),
    body("newPassword").trim().notEmpty().withMessage("new password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/).withMessage('new Password should be 8 to 15 characters long an also contain at least one uppercase letter, one lower case letter, one special character'),
    body('confirmedPassword').custom((value, {req}) => {
        if(value!== req.body.newPassword){
            throw new Error('Password did not match');
        }
        return true;
    }),
]
const validateForgetPassword = [
    body("email").trim().notEmpty().withMessage("email is requied").isEmail().withMessage('Invalid Email Address'),
]
const validateResetPassword = [
    body("token").trim().notEmpty().withMessage("token is requied"),
    body("password").trim().notEmpty().withMessage("password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/).withMessage('Password should be 8 to 15 characters long an also contain at least one uppercase letter, one lower case letter, one special character'),
]

module.exports = { validateUserData, validateUserLogin, validateUpdatePassword, validateForgetPassword, validateResetPassword };