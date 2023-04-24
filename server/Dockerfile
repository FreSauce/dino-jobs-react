FROM node

WORKDIR /server

COPY package.json .

RUN apt update && apt-get -y install openjdk-8-jdk python3 gcc g++

RUN yarn

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]


