#!/bin/bash

echo "Exécution des migrations..."
node ace migration:run

echo "demarrage du server"
node ace serve --hmr --no-clear