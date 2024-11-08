import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Service pour ajouter une image de produit
export const addProductImage = async (productId: number, url: string) => {
    try {
        const productImage = await prisma.productImages.create({
            data: {
                productId,
                url,
            },
        })
        return productImage
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'image du produit :", error)
        throw new Error("Erreur lors de l'ajout de l'image du produit.")
    }
}