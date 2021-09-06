# syntax=docker/dockerfile:1

FROM node:12-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD "nest start --watch"