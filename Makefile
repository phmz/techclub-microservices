.PHONY: install start lint

install:
	docker-compose build
	if [ -d backend ]; then cd backend && npm install; fi
	if [ -d frontend ]; then cd frontend && npm install; fi
	if [ -d settings-management-ms ]; then cd settings-management-ms && npm install; fi
	if [ -d stock-market-data-ms ]; then cd stock-market-data-ms && npm install; fi

start:
	docker-compose up -d
	if [ -d backend ]; then cd backend && npm run start:dev; fi
	if [ -d frontend ]; then cd frontend && npm run start; fi
	if [ -d stock-market-data-ms ]; then cd stock-market-data-ms && npm run start:dev; fi

lint:
	if [ -d backend ]; then cd backend && npm run lint; fi
	if [ -d frontend ]; then cd frontend && npm run lint; fi
	if [ -d settings-management-ms ]; then cd settings-management-ms && npm run lint; fi
	if [ -d stock-market-data-ms ]; then cd stock-market-data-ms && npm run lint; fi
