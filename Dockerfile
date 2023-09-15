FROM node:16-alpine AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/ocr-invoice-frontend /usr/share/nginx/html
COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["/start.sh"]