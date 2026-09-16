FROM node:22-alpine AS web
WORKDIR /web
COPY frontend/package.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM golang:1.23-alpine AS api
WORKDIR /src
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /ripple-api .

FROM alpine:3.20
RUN apk add --no-cache ca-certificates
COPY --from=api /ripple-api /ripple-api
COPY --from=web /web/dist /app/web
ENV STATIC_DIR=/app/web
ENV HTTP_ADDR=0.0.0.0:8080
EXPOSE 8080
CMD ["/ripple-api"]
