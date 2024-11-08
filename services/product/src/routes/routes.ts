import express from 'express'
import { 
        getAllProductsController,
        getProductByIdController, 
        createProductController, 
        updateProductController,
        deleteProductController 
    } from '../controllers/product.controllers'
import { addProductImageController } from '../controllers/productImages.controllers'

const ProductRouter = express.Router()
const ProductImageRouter = express.Router()


ProductRouter.get('/all', getAllProductsController)
ProductRouter.get('/:id', getProductByIdController)
ProductRouter.post('/', createProductController)
ProductRouter.patch('/:id', updateProductController)
ProductRouter.delete('/:id', deleteProductController)

// Route pour ajouter une image
ProductImageRouter.post('/', addProductImageController)

export default ProductRouter