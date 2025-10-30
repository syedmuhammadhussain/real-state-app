# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies for native modules if needed
RUN apk add --no-cache python3 make g++

# Copy package manifests
COPY package.json package-lock.json ./

# Install all deps (including dev) for build
RUN npm ci

# Copy source
COPY . .

# Declare build args for public env vars
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_TBANK_TERMINAL_KEY
ARG NEXT_PUBLIC_TBANK_PASSWORD
ARG NEXT_PUBLIC_TBANK_INIT_ENDPOINT
ARG NEXT_PUBLIC_TBANK_STATUS_ENDPOINT

# Export them so Next.js sees them at build time
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXT_PUBLIC_TBANK_TERMINAL_KEY=${NEXT_PUBLIC_TBANK_TERMINAL_KEY}
ENV NEXT_PUBLIC_TBANK_PASSWORD=${NEXT_PUBLIC_TBANK_PASSWORD}
ENV NEXT_PUBLIC_TBANK_INIT_ENDPOINT=${NEXT_PUBLIC_TBANK_INIT_ENDPOINT}
ENV NEXT_PUBLIC_TBANK_STATUS_ENDPOINT=${NEXT_PUBLIC_TBANK_STATUS_ENDPOINT}

# Build Next.js app here in builder stage
RUN npm run build

# ---- runner ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production deps
RUN npm ci --omit=dev --ignore-scripts

EXPOSE 3000
CMD ["npm", "start", "--", "-p", "3000", "-H", "0.0.0.0"]