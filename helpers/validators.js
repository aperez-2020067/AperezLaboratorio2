//Validar campos en las rutas
import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors, validateErrorWithoutImg} from "./validate.error.js"
import { existUsername, objectIdValid } from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrors
]


export const saveAnimalValidator = [
body('name', 'Name cannot be empty')
    .isLength({max: 35})
    .notEmpty(),
body('description', 'Description cannot be empty')
    .notEmpty(),
body('age', 'Age cannot be empty')
    .isLength({max: 10})
    .notEmpty(),
body('type', 'Type cannot be empty')
    .notEmpty()
    .toUpperCase(),
body('keeper', 'keeper cannot be empty')
    .notEmpty()
    .custom(objectIdValid),
validateErrorWithoutImg

]

export const updateValidator = [
    body('name', 'Name cannot be empty')
        .optional()
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .optional()
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .optional()
        .notEmpty()
        .isEmail(),
    body('username', 'Username cannot be empty')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .optional()
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const newPasswordValidation = [
    body('newPassword', 'NewPassword cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
 validateErrorWithoutImg

]


export const agendarCitaValidation = [
    body('animalId', 'AnimalId cannot be empty')
        .notEmpty(),
    body('date', 'Date cannot be empty')
        .notEmpty(),
    body('reason', 'Reason cannot be empty')
        .notEmpty(),
 validateErrorWithoutImg

]


