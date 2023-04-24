FROM node

WORKDIR /server

COPY package.json .

RUN sudo apt update && sudo apt install openjdk-8-jdk -y && sudo apt install python3 -y && sudo apt install python3-pip -y \
	sudo apt install gcc -y && sudo apt install g++ -y

RUN yarn

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]


