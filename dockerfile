# Base image: node:21
FROM node:21

# Create app directory
WORKDIR /app

# Copy app files
COPY --chown=node:node . /app/

# Install app dependencies
RUN npm install --prefix client && \
    npm install --prefix server

# Environment variables
ENV SSL false
ENV PORT 5000
ENV NODE_ENV production

# Build app
RUN npm run build --prefix client && \
    npm run build --prefix server

# Healthcheck
HEALTHCHECK --interval=1m --timeout=10s --retries=3 CMD wget -q -O - http://localhost:${PORT} || exit 1

# Expose port
EXPOSE ${PORT}

# Run as node user
USER node

# Set working directory to server
WORKDIR /app/server

# Deploy the database and start the server
CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]
