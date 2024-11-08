import express from 'express'

import { addProductImageController } from '../controllers/productImages.controllers'

const ProductImageRouter = express.Router()

// Route pour ajouter une image
ProductImageRouter.post('/', addProductImageController)

export default ProductImageRouter