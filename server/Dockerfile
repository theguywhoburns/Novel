# Dockerfile for the server
FROM node:23
WORKDIR /server
COPY package.json /server/
RUN npm i -g nodemon
RUN npm i
COPY ./server /server/
RUN npm i
EXPOSE 4000
EXPOSE 4200
ENTRYPOINT [ "nodemon", "/usr/src/app/index.js" ]
CMD ["npm", "run", "dev"]