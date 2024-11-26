#!/bin/bash

cd services/category

npx prisma generate

# Run Prisma migration
npx prisma migrate deploy

npx prisma db push

npx ts-node-dev --respawn --transpile-only ./src/index.ts

echo "Prisma client launched and migration applied successfully."