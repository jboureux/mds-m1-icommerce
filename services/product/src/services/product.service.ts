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
            include: { 
                images: true
            },
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

// Service pour update un produit
export const updateProduct = async (id: number, 
        data: { 
        name?: string, 
        slug?: string, 
        defaultPrice?: number, 
        categoryId?: number, 
        //categoryIds?: number[], 
        //images?: string[] 
    }) => {
        try {
            const updatedProduct = await prisma.$transaction(async (prisma) => {
                const product = await prisma.product.update({
                    where: { id },
                    data: { name: data.name, slug: data.slug, defaultPrice: data.defaultPrice,  categoryId: data.categoryId},
                })

                /*if (data.categoryIds) {
                    await prisma.productCategory.deleteMany({ where: { productId: product.id }})
                    await prisma.productCategory.createMany({ data: data.images?.map(categoryId => ({
                            productId: product.id, categoryId
                        })
                    )})
                }

                if (data.images) {
                    await prisma.productImages.deleteMany({ where: { productId: product.id } }) 
                    await prisma.productImages.createMany({ data: data.images.map(categoryId => ({
                            productId: product.id, categoryId
                        }) 
                    )})    
                }*/

                return product
            })

            return updatedProduct
        } catch (error) {
            console.error("Erreur lors de la mise à jour du produit :", error)
            throw new Error("Erreur lors de la mise à jour du produit.")
        }
    } 


 // Service pour supprimer un produit
 export const deleteProduct = async (id: number) => {
    try {
        await prisma.product.delete({ where: { id } })
    } catch (error) {
        console.error("Erreur lors de la suppression du produit :", error)
        throw new Error("Erreur lors de la suppression du produit.")
    }
 }