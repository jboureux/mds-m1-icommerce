import { Request, Response} from "express"
import { addProductImage } from "../services/productImage.service"

// ajouter une Image à un produit
export const addProductImageController = async (req: Request, res: Response): Promise<void> => {
    const { productId, url } = req.body

    // Vérification des valeurs de productId et url
    if (!productId || typeof productId !== 'number' || !url || typeof url !== 'string') {
        res.status(400).json({
            error: "Les champs productId (nombre) et url (chaîne) sont requis.",
            data: { productId, url }
        })
        return
    } 
    
    try {
        const productImage = await addProductImage(productId, url)
        res.status(201).json(productImage)
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de l'image du produit" })
    }
}