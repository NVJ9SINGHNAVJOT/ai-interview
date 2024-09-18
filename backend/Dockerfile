FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run postgresqldb:generate
RUN npm run build
# Make the wait-for.sh script executable
RUN chmod +x start.sh wait-for.sh

EXPOSE 5000