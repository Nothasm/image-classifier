FROM node:alpine
WORKDIR /app
ADD . .
RUN npm i
RUN npm run build
EXPOSE 3000
CMD [ "node", "./dist/server.js" ]