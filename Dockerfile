# Use the official Node.js LTS slim image
FROM node:lts-bullseye-slim

# Set the working directory to /home/node/app
WORKDIR /home/node/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# créer l’arborescence de destination /home/node/app/node_module
# et spécifier que le propriétaire et groupe du propriétaire est node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that your app is listening on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

#docker build . -t marvels
#docker run -p 3000:3000 marvels

#docker images

#docker rm -vf $(docker ps -aq)
#docker rmi -f $(docker images -aq)