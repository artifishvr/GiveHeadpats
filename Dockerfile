FROM node:lts-alpine
WORKDIR /app

COPY build /app

RUN echo '{ "type": "module" }' > package.json

CMD ["node", "index.js"]

EXPOSE 3000