const { body } = require('express-validator')

const isRegisterValid = 
[
    body("email").isString().notEmpty().withMessage("E-mail is required")
                 .trim().isEmail().withMessage("E-mail is not valid"),
    body("password").isString().notEmpty().withMessage("Password is required")
                    .isLength({max: 16}).withMessage("Password is too large")
                    .isStrongPassword({minLength: 8, minNumbers: 1, minSymbols: 1, minUppercase: 1})
                    .withMessage("Password is too weak")
]

const isLoginValid = 
[
    body("email").isString().notEmpty().withMessage("Enter your e-mail")
                 .trim().isEmail().withMessage("E-mail is not valid"),
    body("password").isString().notEmpty().withMessage("Enter your password")
                    .isLength({max: 16}).withMessage("Password is too large")
                    // .isStrongPassword({minLength: 8, minNumbers: 1, minSymbols: 1, minUppercase: 1})
                    // .withMessage("Password is too weak")
]

module.exports = {
    isRegisterValid, 
    isLoginValid
}