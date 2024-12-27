# Dockerfile for the client
FROM node:23
WORKDIR /client
COPY ./client/package.json /client/
RUN npm install -g --force yarn
RUN npm i
COPY ./client /client/
RUN npm i
EXPOSE 5173
CMD ["npm", "run", "dev"]