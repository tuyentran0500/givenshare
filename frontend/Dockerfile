# Pull the Node image from Docker Hub
FROM node:18-alpine

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN yarn install

# Copy rest of the code to container
COPY . .

EXPOSE 3000

# Run the React app
CMD ["yarn", "production"]
