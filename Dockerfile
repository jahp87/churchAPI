# base image
FROM node:16

# environment
ENV DEBIAN_FRONTEND noninteractive

# tools
RUN apt-get update && apt-get install -y wget curl nano sudo zip unzip

# install LoopBack 4 CLI
RUN npm i -g @loopback/cli

# create app directory
WORKDIR /usr/src/app

# install app dependencies. A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY /usr/src/app/package*.json /user/src/app
RUN npm install

# bundle app source
COPY . .

# set permissions
RUN chmod 755 /usr/src/app/ -R

# expose port to docker network
EXPOSE 3000

# start app
CMD [ "npm", "start" ]
