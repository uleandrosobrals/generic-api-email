FROM node:18.10.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3030
CMD [ "npm", "run" ]