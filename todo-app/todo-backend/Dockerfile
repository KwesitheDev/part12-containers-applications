FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

ENV DEBUG=playground:*

EXPOSE 3000

CMD npm start