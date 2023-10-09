.PHONY: install

install:
	docker-compose up -d
	npm i
	npx prisma migrate dev
	npm run dev

restart-database:
	docker-compose down
	docker-compose up -d