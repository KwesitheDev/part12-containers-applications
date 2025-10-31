# Stage 1: Install dependencies and run tests
FROM node:20 AS test-stage
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
#test before build
RUN npm test

# Stage 2: Build the app 
FROM node:20 AS build-stage
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

# Stage 3: Serve with Nginx
FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
