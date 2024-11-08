
import { Request, Response } from 'express'
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../services/product.service'

export const createProductController = async (req: Request, res: Response) => {
    const { name, slug, defaultPrice, categoryId } = req.body
    
    try {
        const product = await createProduct(name, slug, defaultPrice, categoryId)
        res.status(201).json(product)
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la création du produit."})
        }
}

export const getAllProductsController = async (req: Request, res: Response) => {
    const categoryFilter = req.query.category ? Number(req.query.category) : undefined
    try {
        const products = await getAllProducts(categoryFilter)
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des produits"})
    }
}

export const getProductByIdController = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const product = await getProductById(Number(id))
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: "Produit non trouvé"})
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du produit"})
    }
}

export const updateProductController = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, slug, defaultPrice, categoryId } = req.body
    //const { name, slug, defaultPrice, categoryId, images } = req.body
    try {
        const product = await updateProduct(
            Number(id), 
            { name, slug, defaultPrice, categoryId }
            // { name, slug, defaultPrice, categoryId, images }
        )
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du produit" })
    }
}

export const deleteProductController = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await deleteProduct(Number(id))
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du produit." })
    }
}