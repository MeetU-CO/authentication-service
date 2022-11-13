FROM node:16.18.1-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i glob rimraf

RUN npm i --only=development

COPY . .

RUN npm run build

FROM node:16.18.1-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]