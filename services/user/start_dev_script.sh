#!/bin/bash

echo "Génération du fichier .env de développement pour Adonis (User Service)"
cat <<EOL > .env
APP_KEY=dev_user12345678
HOST=0.0.0.0
PORT=8001
LOG_LEVEL=info
EOL

echo "Exécution des migrations pour le User Service..."
node ace migration:run

echo "Demarrage du serveur pour le service User"
node ace serve --hmr --no-clear