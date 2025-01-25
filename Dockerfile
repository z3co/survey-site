FROM node:23-alpine

USER node

WORKDIR /code

COPY package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "index.js" ]
