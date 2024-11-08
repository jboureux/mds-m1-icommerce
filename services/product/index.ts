import express from "express"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import { error } from "console"
import ProductRouter from "./src/routes/routes"
import ProductImageRouter from "./src/routes/routes"

dotenv.config()

const app = express()
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

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`)
})

process.on('SIGINT', async () => {
    await prisma.$disconnect()
    console.log('Déconnexion de la base de donnée.')
    process.exit(0)
})