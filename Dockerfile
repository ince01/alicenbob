# A concise, two-stage Dockerfile for your Node.js TypeScript application

# ---- Builder Stage ----
# This stage installs all dependencies, copies source, and builds the app.
FROM node:lts-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies (dev included) for the build
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the TypeScript source code.
# The `tsc-alias` in your build script handles path aliases.
RUN yarn build

# ---- Production Stage ----
# This stage creates the final, lean image for running the application.
FROM node:lts-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy package files to install only production dependencies
COPY package.json yarn.lock* ./
RUN yarn install --production --frozen-lockfile

# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on (update if different)
EXPOSE 3000

# The command to start the application.
CMD ["yarn", "start"]
