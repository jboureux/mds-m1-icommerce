#!/bin/bash

echo "Génération du fichier .env de développement pour Adonis (Auth Service)"
cat <<EOL > .env
APP_KEY=dev_auth12345678
HOST=0.0.0.0
PORT=8002
LOG_LEVEL=info
EOL

echo "Exécution des migrations..."
node ace migration:run

echo "demarrage du server"
node ace serve --hmr --no-clear