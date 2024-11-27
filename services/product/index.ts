import express, { Express } from "express"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import ProductRouter from "./src/routes/product.routes"
import ProductImageRouter from "./src/routes/productImages.routes"

dotenv.config()

const app = express()
app.disable("x-powered-by")
const prisma = new PrismaClient()

app.use(express.json())

// Route pour le service Product
app.use('/product', ProductRouter)
app.use('/images', ProductImageRouter)

// Gestion d'erreurs génériques
app.use((
    err: any,  
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) => {
        console.error(err.stack)
        res.status(500).json({ error: "Quelque chose s'est mal passé."})
})

const PORT = process.env.PRODUCT_PORT || 3000

let server: any

// On évite de démarrer le serveur lors des tests
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => {
        console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`)
    })
}

process.on('SIGINT', async () => {
    if (server) {
        server.close()
    }
    await prisma.$disconnect()
    console.log('Déconnexion de la base de donnée.')
    process.exit(0)
})

export default app
export {server}