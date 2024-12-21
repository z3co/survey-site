FROM node:23-alpine

WORKDIR /code

COPY package*.json ./

RUN npm install --omit=dev

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD [ "node", "index.js" ]
