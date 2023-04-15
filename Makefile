.PHONY: install start lint

install:
	if [ -d backend ]; then cd backend && npm install; fi
	if [ -d user-management-ms ]; then cd user-management-ms && npm install; fi
	if [ -d product-management-ms ]; then cd product-management-ms && npm install; fi
	if [ -d order-processing-ms ]; then cd order-processing-ms && npm install; fi

start:
	if [ -d backend ]; then cd backend && npm run start:dev; fi
	if [ -d user-management-ms ]; then cd user-management-ms && npm run start:dev; fi
	if [ -d product-management-ms ]; then cd product-management-ms && npm run start:dev; fi
	if [ -d order-processing-ms ]; then cd order-processing-ms && npm run start:dev; fi

lint:
	if [ -d backend ]; then cd backend && npm run lint; fi
	if [ -d user-management-ms ]; then cd user-management-ms && npm run lint; fi
	if [ -d product-management-ms ]; then cd product-management-ms && npm run lint; fi
	if [ -d order-processing-ms ]; then cd order-processing-ms && npm run lint; fi
