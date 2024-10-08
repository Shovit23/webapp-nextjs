FROM node:20-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npx prisma generate
RUN npm run build 
EXPOSE 3000
CMD ["npm","run","start"]
