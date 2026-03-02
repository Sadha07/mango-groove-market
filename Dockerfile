FROM node:trixie-slim

WORKDIR /app

COPY *.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm","run","dev]
