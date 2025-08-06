# 
# File: user-auth-frontend/Dockerfile ...
# 
# Multi-stage Dockerfile for a React application ...

# Stage 1 - the build environment ...
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Set environment variable for React app ...
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Build the React application ...
RUN npm run build 

# Stage 2 - the production environment ...
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx configuration file ...
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]