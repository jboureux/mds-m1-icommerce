
import { Request, Response } from 'express'
import { createProduct } from '../services/service'

export const createProductController = async (req: Request, res: Response) => {
    const { name, slug, defaultPrice, categories } = req.body
    try {
        const product = await createProduct(name, slug, defaultPrice, categories)
        res.status(201).json(product)
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la création du produit."})
        }
}