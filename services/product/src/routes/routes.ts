import express from 'express'
import { 
    getAllProductsController,
        getProductByIdController, 
        createProductController, 
        deleteProductController 
    } from '../controllers/controllers'

const ProductRouter = express.Router()

ProductRouter.get('/all', getAllProductsController)
ProductRouter.get('/:id', getProductByIdController)
ProductRouter.post('/', createProductController)
ProductRouter.delete('/:id', deleteProductController)

export default ProductRouter