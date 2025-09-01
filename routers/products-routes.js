import express from 'express'
import products from '../logic/products.js'
import { productValidation } from '../validations/productsValidation.js'
import { allowedTo, handlejwt } from '../middelwares/catchLogicMistakes.js'
import values from '../utilites/values.js'
import { upload } from '../uploadImages.js'
const router=express.Router()
router.route("/")
        .get(products.getProducts)
        .post(handlejwt,allowedTo(values.ADMIN),upload.single("image"),products.postProduct)
        // productValidationf,
router.get("/:id", products.getProduct)
router.patch("/:id",handlejwt,allowedTo(values.ADMIN),products.updateProduct)
router.delete("/:id",handlejwt,allowedTo(values.ADMIN),products.deleteProduct)
export default router