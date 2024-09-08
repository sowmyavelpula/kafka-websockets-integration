# Dockerfile for the Kafka Producer

FROM node:lts-alpine
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app/producer

# Copy the necessary files
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies
RUN npm install --production --silent

# Copy the rest of the application files
COPY . .

# Expose the port for the producer's REST API
EXPOSE 3000 9229

# Set ownership of the application files to the node user
RUN chown -R node /usr/src/app/producer

# Use the node user to run the application
USER node

# Start the producer application
# CMD ["node","--inspect=0.0.0.0:9229", "server.js"]
CMD ["node", "--inspect=0.0.0.0:9229", "server.js"]

