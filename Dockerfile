FROM node:trixie-slim

WORKDIR /app

COPY *.json .

RUN npm i

COPY . .

CMD ["npm","run","dev]
