import express from 'express'
import { 
        getAllProductsController,
        getProductByIdController,
        createProductHandler, 
        /*createProductController,*/
        updateProductController,
        deleteProductController 
    } from '../controllers/product.controllers'

const ProductRouter = express.Router()


ProductRouter.get('/all', getAllProductsController)
ProductRouter.get('/:id', getProductByIdController)
ProductRouter.post('/', createProductHandler)
//ProductRouter.post('/', createProductController)
ProductRouter.patch('/:id', updateProductController)
ProductRouter.delete('/:id', deleteProductController)


export default ProductRouter