# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)

RUN chmod 777 /usr/src/ -R

RUN mkdir -p /usr/src/app

RUN chmod 755 /usr/src/ -R



WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "." ]
