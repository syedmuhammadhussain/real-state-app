# File: next-app/Dockerfile

# 1. Build Stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN yarn install --frozen-lockfile

COPY . .

# 2. Production Stage
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy only what’s needed
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app ./

# Build Next
RUN yarn build

EXPOSE 3000

# Start your app; replace with your start script
CMD ["yarn", "start"]
