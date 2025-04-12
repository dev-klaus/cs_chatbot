FROM node:18

ARG NPM_USER

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

EXPOSE 80

CMD ["node", "back/server.js"]