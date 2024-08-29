FROM node:18-alpine

WORKDIR /sistema_hoteles/

COPY public/ /sistema_hoteles/public
COPY src/ /sistema_hoteles/src
COPY package.json /sistema_hoteles/

RUN npm install

CMD ["npm", "start"]