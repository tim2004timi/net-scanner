
FROM node:18-alpine AS runtime

WORKDIR /App

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
