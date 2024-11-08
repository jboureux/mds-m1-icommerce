import { Request, Response} from "express"
import { addProductImage } from "../services/productImage.service"

// ajouter une Image à un produit
export const addProductImageController = async (req: Request, res: Response) => {
    const { productId, url } = req.body

    try {
        const productImage = await addProductImage(productId, url)
        res.status(201).json(productImage)
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de l'image du produit" })
    }
}