FROM node

WORKDIR /server

COPY package.json ./

RUN apt-get -y install python3 gcc g++

RUN yarn

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]


