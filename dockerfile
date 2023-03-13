#Alpine x64
FROM mcr.microsoft.com/dotnet/runtime-deps:7.0.3-alpine3.17-amd64 as initial

WORKDIR /app
COPY . .
RUN chmod +x ./linux64_musl/AppWeb.Web

RUN apk upgrade --no-cache --available && \
    apk add curl && \
    rm -rf /var/cache/apk/*

RUN curl -L https://fly.io/install.sh | sh

#FROM loadimpact/k6:latest AS k6official

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0.3-alpine3.17-amd64
RUN apk upgrade --no-cache --available && \
    apk add --no-cache curl ca-certificates && \
    rm -rf /var/cache/apk/*

LABEL Author="Sridharan Srinivasan" 

EXPOSE 8080
#EXPOSE 9091

WORKDIR /app
COPY --from=initial /app /app
COPY --from=initial /root/.fly /root/.fly 

ENV FLYCTL_INSTALL="/root/.fly"
ENV PATH="$FLYCTL_INSTALL/bin:$PATH"

#COPY --from=k6official /usr/bin/k6 /usr/bin/k6

#http://0.0.0.0:9091
CMD ["./linux64_musl/AppWeb.Web", "--urls", "http://0.0.0.0:8080;"] 

