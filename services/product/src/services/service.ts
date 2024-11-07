import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Service pour créer un produit
export const createProduct = async (name: string, slug: string, defaultPrice: number, categoryId: number)  => {
    try {
        const product = await prisma.product.create({
            data: {
                name,
                slug,
                defaultPrice,
                categoryId
            },
        })
        return product
        } catch (error) {
            console.error("Erreur lors de la création du produit :", error)
            throw new Error("Erreur lors de la création du produit.")
        }
}

// Service pour obtenir tous les produits
export const getAllProducts= async (categoryFilter?: number) => {
    try {
        const products = await prisma.product.findMany({
            where: categoryFilter ? { categoryId: categoryFilter } : {},
            // On inclut les images et les catégories associés
            //include: { images: true, categoryId: { include: { category: true} }},
        })
        return products
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error)
        throw new Error("Erreur lors de la récupération des produits.")
    }
}

// Service pour obtenir un produit par ID
export const getProductById = async (id: number) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            //include: { images: true, categories: { include: { category: true } } },
        })
        return product
    } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error)
        throw new Error("Erreur lors de la récupération du produit.")
    }
}