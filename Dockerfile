FROM node:23
# Client
EXPOSE 5173:5173
# Server
EXPOSE 4000:4000
EXPOSE 4100:4100
EXPOSE 4200:4200
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run initialize
CMD ["npm", "run", "web"]
