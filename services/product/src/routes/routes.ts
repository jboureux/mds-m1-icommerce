import express from 'express'
import { createProductController, getAllProductsController, getProductByIdController } from '../controllers/controllers'

const ProductRouter = express.Router()

ProductRouter.post('/', createProductController)
ProductRouter.get('/all', getAllProductsController)
ProductRouter.get('/:id', getProductByIdController)

export default ProductRouter