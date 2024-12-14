FROM node:22.7 

WORKDIR /index

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node","index.js" ]