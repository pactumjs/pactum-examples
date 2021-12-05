FROM node:14.15.4-alpine3.12
WORKDIR app
COPY package.json .
RUN npm i
COPY /src .
CMD ["./node_modules/.bin/nyc", "--reporter=cobertura", "--reporter=lcov", "--reporter=text", "node", "app.js"]