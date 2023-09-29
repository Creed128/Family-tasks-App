FROM node:14
LABEL maintainer = "Credo Ngoukeng"
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
