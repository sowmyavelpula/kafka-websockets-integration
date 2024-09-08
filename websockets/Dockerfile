# Dockerfile for the WebSocket Server

FROM node:lts-alpine
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app/websockets

# Copy the necessary files
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies
RUN npm install --production --silent

# Copy the rest of the application files
COPY . .

# Expose the port for the WebSocket server and the debugger port
EXPOSE 8082 9229

# Set ownership of the application files to the node user
RUN chown -R node /usr/src/app/websockets

# Use the node user to run the application
USER node

# Start the WebSocket server
CMD ["node", "--inspect=0.0.0.0:9229", "webSocketServer.js"]
