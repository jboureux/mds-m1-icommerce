temp-sh:
	docker run --rm -ti -v ./:/app -w /app node:22-alpine /bin/sh 

monorepo-sh:
	docker compose exec monorepo /bin/sh
