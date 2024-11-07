import express from 'express'
import { createProductController } from '../controllers/controllers'

const ProductRouter = express.Router()

ProductRouter.post('/', createProductController)


export default ProductRouter