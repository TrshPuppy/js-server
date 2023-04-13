#syntax=docker/dockerfile:1
FROM node:slim

WORKDIR /app

COPY http.js http.js

CMD ["node","http.js"]