# =============================================
# ABIOLA LAWAL PORTFOLIO — Dockerfile
# Multi-stage: build → production Nginx
# =============================================

# Stage 1: Build (static site, no build step needed — just copy)
FROM nginx:1.27-alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/portfolio.conf

# Copy static site files
COPY public/ /usr/share/nginx/html/

# Set correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    # Create nginx cache/pid directories
    mkdir -p /var/cache/nginx /var/run/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx

# Run as non-root
USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
