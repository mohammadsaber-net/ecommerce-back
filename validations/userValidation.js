import { body } from "express-validator";
export const registerValidtion=[
    body('name')
    .notEmpty()
    .withMessage("name is required"),
    body("email")
    .notEmpty()
    .withMessage("email is not set"),
    body("phone")
    .notEmpty()
    .withMessage("phone is required"),
    body("password")
    .notEmpty()
    .withMessage("password is required"),

]
export const loginValidtion=[
    body('email')
    .notEmpty()
    .withMessage("email is required"),
    body("password")
    .notEmpty()
    .withMessage("password is required"),

]