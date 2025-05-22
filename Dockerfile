
# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies needed for Prisma
RUN apk add --no-cache libc6-compat openssl1.1-compat

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Install production dependencies only
RUN apk add --no-cache libc6-compat openssl1.1-compat

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Set proper permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

# Command to run the application
CMD ["node", "server.js"]
