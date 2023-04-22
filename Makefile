.PHONY: install start lint clean

install:
	docker-compose build
	if [ -d backend ]; then cd backend && npm install; fi
	if [ -d frontend ]; then cd frontend && npm install; fi
	if [ -d settings-management-ms ]; then cd settings-management-ms && npm install; fi
	if [ -d stock-market-data-ms ]; then cd stock-market-data-ms && npm install; fi

start:
	docker-compose up -d

lint:
	if [ -d backend ]; then cd backend && npm run lint; fi
	if [ -d frontend ]; then cd frontend && npm run lint; fi
	if [ -d settings-management-ms ]; then cd settings-management-ms && npm run lint; fi
	if [ -d stock-market-data-ms ]; then cd stock-market-data-ms && npm run lint; fi

clean:
	docker-compose down
	rm -rf postgres
	if [ -d backend ]; then cd backend && npm run clean; fi
	if [ -d frontend ]; then cd frontend && npm run clean; fi
	if [ -d settings-management-ms ]; then cd settings-management-ms && npm run clean; fi
	if [ -d stock-market-data-ms ]; then cd stock-market-data-ms && npm run clean; fi
