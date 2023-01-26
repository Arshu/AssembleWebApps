#Alpine x64
FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine-amd64 as initial

WORKDIR /app
COPY . .
RUN chmod +x ./linux64_musl/AppWeb.Web

RUN apk upgrade --no-cache --available && \
    apk add curl && \
    rm -rf /var/cache/apk/*

RUN curl -L https://fly.io/install.sh | sh

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine-amd64

LABEL Author="Sridharan Srinivasan" 

EXPOSE 8080
#EXPOSE 9091

WORKDIR /app
COPY --from=initial /app /app
COPY --from=initial /root/.fly /root/.fly 

ENV FLYCTL_INSTALL="/root/.fly"
ENV PATH="$FLYCTL_INSTALL/bin:$PATH"

CMD ["./linux64_musl/AppWeb.Web", "--urls", "http://0.0.0.0:8080;http://0.0.0.0:9091"]

