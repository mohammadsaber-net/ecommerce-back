import { body } from "express-validator";
export const orderValidation=[
    body('name')
    .notEmpty()
    .withMessage("name is required"),
    body("email")
    .notEmpty()
    .withMessage("email is required"),
    body("phone")
    .notEmpty()
    .withMessage("phone is required"),
    body("address")
    .notEmpty()
    .withMessage("address is required"),
    body("items")
    .notEmpty()
    .withMessage("items is required"),
    body("typeOfPayment")
    .notEmpty()
    .withMessage("typeOfPayment is required"),
]