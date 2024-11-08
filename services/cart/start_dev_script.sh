#!/bin/bash

echo "Génération du client prisma pour le Cart Service..."
npx prisma generate

echo "Exécution des migrations pour le Cart Service..."
npx prisma migrate deploy

echo "Demarrage du serveur pour le service Cart"
npx ts-node-dev --respawn --transpile-only ./src/index.ts