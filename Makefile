temp-sh:
		docker run --rm -ti -v ./:/app -w /app node:alpine /bin/sh 

monorepo-sh:
		docker compose exec monorepo /bin/sh