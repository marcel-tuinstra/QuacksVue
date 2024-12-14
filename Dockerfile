# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install project dependencies using yarn
RUN yarn install

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to start the Vue development server
CMD ["yarn", "serve"]