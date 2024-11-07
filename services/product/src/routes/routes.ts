import express from 'express'
import { createProductController, getAllProductsController } from '../controllers/controllers'
/* import { 
        getAllProductsController, 
        getProductByIdController, 
        createProductController, 
        updateProductController, 
        deleteProductController 
    } from '../controllers/controllers'*/

const ProductRouter = express.Router()

ProductRouter.post('/', createProductController)
ProductRouter.get('/all', getAllProductsController)
/*
ProductRouter.get('/:id', getProductByIdController)
ProductRouter.post('/', createProductController)
ProductRouter.patch('/:id', updateProductController)
ProductRouter.delete('/', deleteProductController)*/


export default ProductRouter