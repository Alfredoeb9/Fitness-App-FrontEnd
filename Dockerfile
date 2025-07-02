# Fitness-App-FrontEnd/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

# Set environment variables for development server
ENV HOST=0.0.0.0
ENV PORT=3002

CMD ["npm", "start"]