import { body } from "express-validator";
export const productValidation=[
    body('title')
    .notEmpty()
    .withMessage("title is required"),
    body("price")
    .notEmpty()
    .withMessage("price is not set"),
    body("category")
    .notEmpty()
    .withMessage("category is required"),
    body("description")
    .notEmpty()
    .withMessage("description is required"),
    body("rating.count")
    .notEmpty()
    .withMessage("count is required"),
    body("rating.rate")
    .notEmpty()
    .withMessage("rate is required"),
]