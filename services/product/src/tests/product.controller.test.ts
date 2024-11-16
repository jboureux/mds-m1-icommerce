import { addProductImageController } from '../controllers/productImages.controllers'
import { addProductImage } from '../services/productImage.service'
import { Request, Response } from 'express'
import request from 'supertest'
import app from '../../index'
import { PrismaClient } from "@prisma/client"
import { describe } from 'node:test'

// Définition du type pour le mock Prisma
type MockPrismaClient = {
    $connect: jest.Mock;
    $disconnect: jest.Mock;
    $transaction: jest.Mock;
    product: {
        deleteMany: jest.Mock;
        create: jest.Mock;
        findMany: jest.Mock;
        findUnique: jest.Mock;
    };
    productCategory: {
        deleteMany: jest.Mock;
        create: jest.Mock;
    };
    productImage: {
        create: jest.Mock;
    };
}

jest.mock('@prisma/client', () => {
    const mockPrisma: MockPrismaClient = {
        $connect: jest.fn(),
        $disconnect: jest.fn(),
        $transaction: jest.fn().mockImplementation((callback: (tx: MockPrismaClient) => Promise<any>) => {
            return callback(mockPrisma);
        }),
        product: {
            deleteMany: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
        productCategory: {
            deleteMany: jest.fn(),
            create: jest.fn(),
        },
        productImage: {
            create: jest.fn(),
        }
    };
    return { PrismaClient: jest.fn(() => mockPrisma) };
});

const prisma = new PrismaClient() as unknown as MockPrismaClient;

describe('Tests pour les controllers de produits', () => {
    beforeAll(async () => {
        await prisma.$connect();
        process.env.NODE_ENV = 'test';
    });

    beforeEach(async () => {
        const mockProduct = {
            id: 1,
            name: 'Produit Test',
            slug: 'produit-test',
            defaultPrice: 100.0,
            images: 'https://exemple.com/image.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        (prisma.product.create as jest.Mock).mockResolvedValue(mockProduct);
        
        (prisma.productCategory.create as jest.Mock).mockResolvedValue({
            productId: 1,
            categoryId: 1
        });

        (prisma.$transaction as jest.Mock).mockImplementation(
            async (callback: (tx: MockPrismaClient) => Promise<any>) => {
                return callback(prisma);
            }
        );
    });

    // Après chaque test on nettoie la bdd
    afterEach(async () => {
        await prisma.product.deleteMany()
        await prisma.productCategory.deleteMany()
    })

    afterAll(async () => {
        // Déconnexion à la bdd après tous les tests
        await prisma.$disconnect()
    })

    describe('createProductController', () => {
        it('Crée un produit avec succès et retourne un statut 201', async () => {
            const productData = {
                name:'Product Test',
                slug: 'produit-test',
                defaultPrice: 99.99,
                categoryId: 1,
                images: 'https://exemple.com/image.jpg'
            }
            
            
            const response = await request(app)
                .post('/product')
                .send(productData)
            
            // Vérification des responses
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('id')
            expect(response.body.name).toBe(productData.name)
            expect(response.body.slug).toBe(productData.slug)
            const createdProduct = await prisma.product.findUnique({
                where: { id: response.body.id }
            })
            expect(createdProduct).not.toBeNull()
        })

        it('Retourne une erreur 400 si des champs sont manquants', async () => {
            const incompleteData = {
                name: 'Produit Incomplet',
                slug: 'produit-incomplet'
            }
            const response = await request(app)
                .post('/product')
                .send(incompleteData)
            
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty(
                'error',
                "Tous les champs sont requis : name, slug, defaultPrice, categoryId"
            )
            const createdProduct = await prisma.product.findUnique({
                where: { slug: incompleteData.slug }
            })
            expect(createdProduct).toBeNull()
        })
    })

    describe('getAllProductsController', () => {
        // Configuration des données de test
        const testProducts = [
            {
                id: 1,
                name: 'Produit A',
                slug: 'produit-a',
                defaultPrice: 99.99,
                images: 'https://exemple.com/image.jpg',
                categoryId: 1,
                createdAt: new Date('2023-10-01T10:00:00Z'),
                updateAt: new Date('2023-10-05T15:00:00Z'), 
            },
            {
                id: 2,
                name: 'Produit B',
                slug: 'produit-b',
                defaultPrice: 149.99,
                images: 'https://exemple.com/image.jpg',
                categoryId: 2,
                createdAt: new Date('2023-09-25T08:30:00Z'),
                updateAt: new Date('2023-10-03T12:45:00Z'), 
            },
        ]
        
        const filteredProducts = [
            {
                id: 3,
                name: 'Produit C',
                slug: 'produit-c',
                defaultPrice: 199.99,
                images: 'https://exemple.com/image.jpg',
                categoryId: 2,
                createdAt: new Date('2023-10-02T11:20:00Z'),
                updateAt: new Date('2023-10-06T09:00:00Z'), 
            },
        ]       

        beforeEach(() => {
            // Mock de la méthode findMany pour retourner les produits de test
            jest.spyOn(prisma.product, 'findMany').mockResolvedValue(testProducts)
        })

        it('Récupère tous les produits avec succès', async () => {
            jest.spyOn(prisma.product, 'findMany').mockResolvedValue(testProducts)
            const response = await request(app).get('/product/all')
        
            expect(response.status).toBe(200)
            expect(response.body).toEqual(testProducts)
            expect(prisma.product.findMany).toHaveBeenCalledWith({})
        })
        
        it('Filtre les produits par catégorie', async () => {
            jest.spyOn(prisma.product, 'findMany').mockResolvedValue(filteredProducts)
        
            const response = await request(app).get('/product/all?category=2')
        
            expect(response.status).toBe(200);
            expect(response.body).toEqual(filteredProducts)
            expect(prisma.product.findMany).toHaveBeenCalledWith({
                where: { categoryId: 2 },
            })
        })        

        it('Gère les erreurs de récupération des produits', async () => {
            // Mock pour simuler une erreur
            jest.spyOn(prisma.product, 'findMany').mockRejectedValue(new Error('Database error'))

            const response = await request(app).get('/products')

            expect(response.status).toBe(500)
            expect(response.body).toHaveProperty('error', 'Erreur lors de la récupération des produits')
        })
    })

    describe('Tests pour addProductImageController', () => {
        let req: Partial<Request>;
        let res: Partial<Response>;
        let next: jest.Mock;
    
        beforeEach(() => {
            req = {}; // Initialisation de req comme un objet partiel.
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            next = jest.fn();
        });
    
        it('Ajoute une image avec succès et retourne un statut 201', async () => {
            const mockProductImage = {
                id: 1,
                productId: 1,
                url: 'https://exemple.com/image.jpg',
            };
    
            // Spécifiez les types de données attendues dans req.body
            req.body = { productId: 1, url: 'https://exemple.com/image.jpg' };
    
            // Mock de la réponse du service
            (addProductImage as jest.Mock).mockResolvedValue(mockProductImage);
    
            // Appel du contrôleur
            await addProductImageController(req as Request, res as Response);
    
            // Assertions
            expect(addProductImage).toHaveBeenCalledWith(1, 'https://exemple.com/image.jpg');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockProductImage);
        });
    
        it('Retourne une erreur 400 si les champs sont manquants', async () => {
            req.body = { productId: 1 }; // Champs `url` manquant
    
            await addProductImageController(req as Request, res as Response);
    
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Les champs productId (nombre) et url (chaîne) sont requis.",
                data: { productId: 1, url: undefined },
            });
        });
    
        it('Retourne une erreur 500 en cas d\'erreur interne', async () => {
            req.body = { productId: 1, url: 'https://exemple.com/image.jpg' };
    
            (addProductImage as jest.Mock).mockRejectedValue(new Error('Erreur simulée'));
    
            await addProductImageController(req as Request, res as Response);
    
            expect(addProductImage).toHaveBeenCalledWith(1, 'https://exemple.com/image.jpg');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Erreur lors de l\'ajout de l\'image du produit',
            });
        });
    });
})