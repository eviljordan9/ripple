FROM golang:1.23-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /ripple-api .

FROM alpine:3.20
RUN apk add --no-cache ca-certificates
COPY --from=build /ripple-api /ripple-api
EXPOSE 8081
CMD ["/ripple-api"]
