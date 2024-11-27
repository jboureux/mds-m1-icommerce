export interface ProductData {
    name: string
    slug: string
    defaultPrice: number
    categoryId: number
    images: string
}

export interface ProductUpdateData{
    name?: string
    slug?: string
    defaultPrice?: number
    categoryId?: number
    images?: string
}