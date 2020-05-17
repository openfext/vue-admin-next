FROM node:12.16.3-alpine
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx:1.17.10
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
