FROM node:22-alpine AS builder                                                                                     
WORKDIR /app                                              
COPY package*.json ./
RUN npm ci
COPY ..
ARG VITE_MQTT_URL
ARG VITE_MQTT_USERNAME                                                                                             
ARG VITE_MQTT_PASSWORD
RUN npm run build                                                                                                  
                                                            
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
