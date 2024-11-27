import express, { Router } from "express"

import { addProductImageController } from '../controllers/productImages.controllers'

const ProductImageRouter: Router = express.Router()

// Route pour ajouter une image
ProductImageRouter.post('/', addProductImageController)

export default ProductImageRouter