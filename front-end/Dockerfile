# build stage
FROM node:13-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]